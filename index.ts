#!/usr/bin/env node
import chalk from 'chalk';
import { installDependencies, addScriptToPackageJson, writeFileInRoot } from './utils';

// Configurations
const nodemonJson = {
    "watch": ["./"], 
    "ext": "tsx,ts,js,jsx", 
    "exec": "node node_modules/css-utilities-generator/dist/generator.js",
    "ignore": ["node_modules/**/*", ".*/**/*"]
}
const dependencies = ["css-utilities-generator", "nodemon", "@babel/generator", "@babel/parser", "@babel/traverse", "@types/babel__generator", "@types/babel__traverse"]

// 1 Install Dependencies
console.log("")
console.log(`${chalk.yellow("Installing")} Dependencies ${dependencies.join(", ")}..`);
installDependencies(dependencies);
console.log(`Dependencies Installed ${chalk.green("Successfully")}`);
console.log("")

// 2 Add command to package.json
console.log("")
console.log(`${chalk.yellow("Adding")} utils command to package.json & configuing nodemon..`);
// 2.1 Add script to package.json
addScriptToPackageJson("utils", "nodemon");
// 2.2 Generate nodemon.json
writeFileInRoot(nodemonJson)
console.log(`Command and configuration added ${chalk.green("Successfully")}`);
console.log("")

// 3 Generate CSS Utilities
console.log("")
console.log(`Congratulations! to generate css utilities on save run:`);
console.log("")
console.log(`    ${chalk.cyan.bold("npm run utils")}`);
console.log("")