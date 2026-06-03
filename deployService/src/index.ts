import { createClient } from 'redis';
import { downloadS3Folder } from './aws';

const subscriber = createClient();

async function main(){
    await subscriber.connect();
    while (true){
        const response = await subscriber.brPop('build-queue', 0);
        console.log(response);
        //@ts-ignore
        const id = response.element

        await downloadS3Folder(`output/${id}`);
    }
    
}

main().catch(console.error);