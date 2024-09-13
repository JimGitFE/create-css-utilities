import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import readline from 'readline';

const runCommand = (command: string) => {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (error: any) {
        console.error(`Error when executing'${command}' log: ${error.message}`);
        process.exit(1);
    }
};

const installDependencies = (dependencies: string[]) => {
    runCommand(`npm i -D ${dependencies.join("@latest ")}`);
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
}

function writeFileInRoot(fileName: string,file: any) {    
    fs.writeFileSync(path.resolve(process.cwd(), fileName), JSON.stringify(file, null, 2), 'utf8');
}

function askUser(title: string, reply: string, defaultAnswer: string, callback: (answer: string) => void) {
        // Create readline interface
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // Ask user for file path
        rl.question(title, (filePath) => {
            // Use default if no path provided
            if (!filePath) {
              filePath = defaultAnswer;
            }
            callback(filePath)
            console.log(reply);
            // Rest of your code here...
          
            rl.close();
          });
}

function isValidPath(filePath: string): boolean {
    try {
      path.parse(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

export { installDependencies, addScriptToPackageJson, writeFileInRoot, askUser, isValidPath };