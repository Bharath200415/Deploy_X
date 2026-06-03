import { spawn } from "child_process";
import path from "path";

export function buildProject(id: string) {
    const projectDir = path.join(__dirname, `output/${id}`);

    return new Promise<void>((resolve, reject) => {
        const install = spawn('npm', ['install'], { cwd: projectDir, shell: true });

        install.stdout?.on('data', data => {
            console.log('npm install stdout: ' + data);
        });

        install.stderr?.on('data', data => {
            console.log('npm install stderr: ' + data);
        });

        install.on('error', reject);
        install.on('close', installCode => {
            if (installCode !== 0) {
                reject(new Error(`npm install failed with exit code ${installCode}`));
                return;
            }

            const build = spawn('npm', ['run', 'build'], { cwd: projectDir, shell: true });

            build.stdout?.on('data', data => {
                console.log('npm run build stdout: ' + data);
            });

            build.stderr?.on('data', data => {
                console.log('npm run build stderr: ' + data);
            });

            build.on('error', reject);
            build.on('close', buildCode => {
                if (buildCode !== 0) {
                    reject(new Error(`npm run build failed with exit code ${buildCode}`));
                    return;
                }

                resolve();
            });
        });
    });

}