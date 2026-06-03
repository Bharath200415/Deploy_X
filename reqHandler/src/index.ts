import 'dotenv/config'
import {S3} from 'aws-sdk'
import express from "express";

const accessKeyId = process.env.ACCESS;
const secretAccessKey = process.env.SECRET;
const endpoint = process.env.ENDPOINT;
const bucket = process.env.BUCKET;

if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    throw new Error("Missing required environment variables");
}

const s3 = new S3({accessKeyId,secretAccessKey,endpoint})

const app = express();

app.get("/*path", async (req, res) => {
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path === "/"
        ? "/index.html"
        : req.path;


    const contents = await s3.getObject({
        Bucket: "vercel-clone",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);

})

app.listen(3001);