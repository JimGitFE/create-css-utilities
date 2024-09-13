import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const runCommand = (command: string) => {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (error: any) {
        console.error(`Error when executing'${command}' log: ${error.message}`);
        process.exit(1);
    }
};

const installDependencies = (dependencies: string[]) => {
    dependencies.forEach((dependency) => {
        runCommand(`npm i -D ${dependency}@latest`);
    });
}

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

function addScriptToPackageJson(scriptName: string, scriptCommand: string) {
    if (!fs.existsSync(packageJsonPath)) {
        console.error('package.json not found in the current directory.');
        process.exit(1);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure scripts section exists
    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }

    // Add or update the script
    packageJson.scripts[scriptName] = scriptCommand;

    // Write changes back to package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`Script "${scriptName}" added to package.json.`);
}

function writeFileInRoot(file: any) {    
    fs.writeFileSync(path.resolve(process.cwd(), 'nodemon.json'), JSON.stringify(file, null, 2), 'utf8');
}

export { installDependencies, addScriptToPackageJson, writeFileInRoot };