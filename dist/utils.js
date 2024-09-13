"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
exports.addScriptToPackageJson = addScriptToPackageJson;
exports.writeFileInRoot = writeFileInRoot;
exports.askUser = askUser;
exports.isValidPath = isValidPath;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const readline_1 = __importDefault(require("readline"));
const runCommand = (command) => {
    try {
        (0, child_process_1.execSync)(command, { stdio: "inherit" });
    }
    catch (error) {
        console.error(`Error when executing'${command}' log: ${error.message}`);
        process.exit(1);
    }
};
const installDependencies = (dependencies) => {
    runCommand(`npm i -D ${dependencies.join("@latest ")}`);
};
exports.installDependencies = installDependencies;
const packageJsonPath = path_1.default.resolve(process.cwd(), 'package.json');
function addScriptToPackageJson(scriptName, scriptCommand) {
    if (!fs_1.default.existsSync(packageJsonPath)) {
        console.error('package.json not found in the current directory.');
        process.exit(1);
    }
    const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
    // Ensure scripts section exists
    if (!packageJson.scripts) {
        packageJson.scripts = {};
    }
    // Add or update the script
    packageJson.scripts[scriptName] = scriptCommand;
    // Write changes back to package.json
    fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}
function writeFileInRoot(fileName, file) {
    fs_1.default.writeFileSync(path_1.default.resolve(process.cwd(), fileName), JSON.stringify(file, null, 2), 'utf8');
}
function askUser(title, reply, defaultAnswer, callback) {
    // Create readline interface
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // Ask user for file path
    rl.question(title, (filePath) => {
        // Use default if no path provided
        if (!filePath) {
            filePath = defaultAnswer;
        }
        callback(filePath);
        console.log(reply);
        // Rest of your code here...
        rl.close();
    });
}
function isValidPath(filePath) {
    try {
        path_1.default.parse(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
