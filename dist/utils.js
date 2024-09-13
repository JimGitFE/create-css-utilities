"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
exports.addScriptToPackageJson = addScriptToPackageJson;
exports.writeFileInRoot = writeFileInRoot;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
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
    dependencies.forEach((dependency) => {
        runCommand(`npm i -D ${dependency}@latest`);
    });
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
    console.log(`Script "${scriptName}" added to package.json.`);
}
function writeFileInRoot(file) {
    fs_1.default.writeFileSync(path_1.default.resolve(process.cwd(), 'nodemon.json'), JSON.stringify(file, null, 2), 'utf8');
}
