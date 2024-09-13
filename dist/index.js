#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
// Configurations
const nodemonJson = {
    "watch": ["./"],
    "ext": "tsx,ts,js,jsx",
    "exec": "node node_modules/css-utilities-generator/dist/generator.js",
    "ignore": ["node_modules/**/*", ".*/**/*"]
};
const dependencies = ["css-utilities-generator", "nodemon", "@babel/generator", "@babel/parser", "@babel/traverse", "@types/babel__generator", "@types/babel__traverse"];
// 1 Install Dependencies
console.log("");
console.log(`${chalk_1.default.yellow("Installing")} Dependencies ${dependencies.join(", ")}..`);
(0, utils_1.installDependencies)(dependencies);
console.log(`Dependencies Installed ${chalk_1.default.green("Successfully")}`);
console.log("");
// 2 Add command to package.json
console.log("");
console.log(`${chalk_1.default.yellow("Adding")} utils command to package.json & configuing nodemon..`);
// 2.1 Add script to package.json
(0, utils_1.addScriptToPackageJson)("utils", "nodemon");
// 2.2 Generate nodemon.json
(0, utils_1.writeFileInRoot)(nodemonJson);
console.log(`Command and configuration added ${chalk_1.default.green("Successfully")}`);
console.log("");
// 3 Generate CSS Utilities
console.log("");
console.log(`Congratulations! to generate css utilities on save run:`);
console.log("");
console.log(`    ${chalk_1.default.cyan.bold("npm run utils")}`);
console.log("");
