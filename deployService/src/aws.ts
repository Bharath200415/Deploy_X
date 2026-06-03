import 'dotenv/config'
import {S3} from "aws-sdk";
import fs from 'fs';

import path from "path";

const accessKeyId = process.env.ACCESS;
const secretAccessKey = process.env.SECRET;
const endpoint = process.env.ENDPOINT;
const bucket = process.env.BUCKET;

if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    throw new Error("Missing required environment variables");
}

const s3 = new S3({accessKeyId,secretAccessKey,endpoint})
// output/asdasd
export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel-clone",
        Prefix: prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async ({Key}) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "vercel-clone",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            })
        })
    }) || []
    console.log("awaiting");

    await Promise.all(allPromises?.filter(x => x !== undefined));
    console.log("Downloaded all files");
}

export function copyFinalDist(id: string) {
    const folderPath = path.join(__dirname, `output/${id}/dist`);

    const allFiles = getAllFiles(folderPath);

    allFiles.forEach(async (file) => {
        const relativePath = path
            .relative(folderPath, file)
            .replace(/\\/g, "/");

        await uploadFile(
            `dist/${id}/${relativePath}`,
            file
        );
    });
}

const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel-clone",
        Key: fileName,
    }).promise();
    console.log(response);
}