import 'dotenv/config'
import {S3} from 'aws-sdk'
import express from "express";
import path from "path";

const accessKeyId = process.env.ACCESS;
const secretAccessKey = process.env.SECRET;
const endpoint = process.env.ENDPOINT;
const bucket = process.env.BUCKET;

if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    throw new Error("Missing required environment variables");
}

const s3 = new S3({accessKeyId,secretAccessKey,endpoint})

const app = express();

app.get("*", async (req, res) => {
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path === "/"
        ? "/index.html"
        : req.path;

    try {
        const contents = await s3.getObject({
            Bucket: "vercel-clone",
            Key: `dist/${id}${filePath}`
        }).promise();
        
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes: { [key: string]: string } = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".ico": "image/x-icon",
            ".json": "application/json",
            ".txt": "text/plain"
        };
        
        const type = mimeTypes[ext] || "application/octet-stream";
        res.set("Content-Type", type);

        res.send(contents.Body);
    } catch (err: any) {
        if (err.code === "NoSuchKey") {
            res.status(404).send("Not Found");
        } else {
            console.error(`Error fetching file dist/${id}${filePath}:`, err);
            res.status(500).send("Internal Server Error");
        }
    }
})

app.listen(3001);