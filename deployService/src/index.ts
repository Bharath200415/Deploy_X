import { createClient } from 'redis';
import { copyFinalDist, downloadS3Folder } from './aws';
import { buildProject } from './utils';

const subscriber = createClient();
const publisher= createClient();
publisher.connect();

async function main(){
    await subscriber.connect();
    while (true){
        const response = await subscriber.brPop('build-queue', 0);
        console.log(response);
        
        //@ts-ignore
        const id = response.element

        await downloadS3Folder(`output/${id}`);
        await buildProject(id);
        await copyFinalDist(id);
        publisher.hSet("status",id,"deployed");
    }
    
}

main().catch(console.error);