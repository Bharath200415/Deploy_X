"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
// filepath : /users/bharath/vercel/dist/output/12311/src/App.jsx
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "42c78ccad856daf6f7e881a30c1ca72c",
    secretAccessKey: "8d009bcd50c510d2e5acd0e507e47aad17e403a529448eee79f3c937234e253c",
    endpoint: "https://bc27f267a22c183ff14137c94e769210.r2.cloudflarestorage.com/vercel-clone"
});
const uploadFile = async (fileName, localFilePath) => {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel-clone",
        Key: fileName,
    }).promise();
    console.log(response);
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=aws.js.map