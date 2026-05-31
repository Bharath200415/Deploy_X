import { createClient } from 'redis';

const subscriber = createClient();

async function main(){
    await subscriber.connect();
    while (true){
        const response = await subscriber.brPop('build-queue', 0);
        console.log(response);
    }
}

main().catch(console.error);