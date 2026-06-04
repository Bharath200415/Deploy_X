import 'dotenv/config';
import { createClient } from 'redis';
import { copyFinalDist, downloadS3Folder } from './aws';
import { buildProject } from './utils';

const redURL = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const subscriber = createClient({ url: redURL });
const publisher = createClient({ url: redURL });

async function main(){
    await subscriber.connect();
    await publisher.connect();
    while (true){
        const response = await subscriber.brPop('build-queue', 0);
        console.log(response);
        
        //@ts-ignore
        const id = response.element

        try {
            await publisher.rPush(`logs:${id}`, "✦ Downloading source code from storage...");
            await downloadS3Folder(`output/${id}`);
            await publisher.rPush(`logs:${id}`, "✦ Source code downloaded.");
            
            await publisher.rPush(`logs:${id}`, "✦ Starting build pipeline (npm install & build)...");
            await buildProject(id, async (log) => {
                await publisher.rPush(`logs:${id}`, log);
            });
            await publisher.rPush(`logs:${id}`, "✦ Build completed successfully.");
            
            await publisher.rPush(`logs:${id}`, "✦ Copying build artifacts to production storage...");
            await copyFinalDist(id);
            await publisher.rPush(`logs:${id}`, "✦ Artifacts uploaded. Deployment live!");
            
            await publisher.hSet("status", id, "deployed");
        } catch (error: any) {
            console.error(`Build failed for id: ${id}`, error);
            await publisher.rPush(`logs:${id}`, `✖ Deployment failed: ${error.message || error}`);
            await publisher.hSet("status", id, "failed");
        } finally {
            // Set 1 hour expiration for the log list to save memory
            await publisher.expire(`logs:${id}`, 3600);
        }
    }
    
}

main().catch(console.error);