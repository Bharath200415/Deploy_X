import 'dotenv/config'
import express from "express";
import cors from "cors";
import simpleGit from "simple-git"
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import {createClient} from "redis";

const redURL= process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const publisher = createClient({
    url: redURL
});

publisher.on("error", err =>
    console.error("Redis Error:", err)
);

const app = express();
app.use(cors());
app.use(express.json());
console.log(__dirname);

app.post("/deploy",async(req,res)=>{
    const repoURL = req.body.repoURL;

    const id = generate(); //to generate a random id and add the cloned repo
    
    try{
        await simpleGit().clone(repoURL,path.join(__dirname,`output/${id}`),
        ["--depth","1"] //shallow cloning
    );
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error:"cloning failed"
        })
    }

    const outputRoot = path.join(__dirname, "output");
    const repoRoot = path.join(outputRoot, id);

    const files = getAllFiles(repoRoot).filter(
        file=>!file.includes(".git") && !file.includes("node_modules")
    );

    await Promise.all(
        files.map(async file=>{
            // Always upload as output/<id>/... using forward slashes for object keys.
            const relativePath = path.relative(outputRoot, file).split(path.sep).join('/');
            await uploadFile(`output/${relativePath}`, file);
        })
    );

    publisher.lPush("build-queue",id).catch(err=>console.error('Redis LPUSH error',err));
    
    console.log(repoURL);


    res.json({
        message:`repo url logged with id: ${id}`
    })
})

app.get("/health",(req,res)=>{
    console.log("The server is up :)");
    res.json({
        message:"the backend is up!"
    })
})


async function start() {
    try {
        const redURL = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
        // connect publisher with provided REDIS_URL or default
        if (!publisher.isOpen) {
            await publisher.connect();
        }
        app.listen(3000, ()=> console.log('Server listening on port 3000'));
    } catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
}

start();