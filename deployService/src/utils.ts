import { spawn } from "child_process";
import path from "path";

export function buildProject(id: string, onLog: (log: string) => void) {
    const projectDir = path.join(__dirname, `output/${id}`);

    return new Promise<void>((resolve, reject) => {
        const install = spawn('npm', ['install'], { cwd: projectDir, shell: true });

        install.stdout?.on('data', data => {
            console.log('npm install stdout: ' + data);
            const lines = data.toString().split('\n');
            lines.forEach((line: string) => {
                if (line.trim()) onLog(`[install] ${line.trim()}`);
            });
        });

        install.stderr?.on('data', data => {
            console.log('npm install stderr: ' + data);
            const lines = data.toString().split('\n');
            lines.forEach((line: string) => {
                if (line.trim()) onLog(`[install-err] ${line.trim()}`);
            });
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
                const lines = data.toString().split('\n');
                lines.forEach((line: string) => {
                    if (line.trim()) onLog(`[build] ${line.trim()}`);
                });
            });

            build.stderr?.on('data', data => {
                console.log('npm run build stderr: ' + data);
                const lines = data.toString().split('\n');
                lines.forEach((line: string) => {
                    if (line.trim()) onLog(`[build-err] ${line.trim()}`);
                });
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