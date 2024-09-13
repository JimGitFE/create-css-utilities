#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
// Configurations
let nodemonJson = {
    "watch": ["./"],
    "ext": "tsx,ts,js,jsx",
    "exec": "node node_modules/css-utilities-generator/dist/generator.js",
    "ignore": ["node_modules/**/*", ".*/**/*"]
};
let cuconfig = {
    "onlyDictionary": true,
    "acceptAnyValue": true,
    "writeTo": "./styles/utilities.css",
    "extensions": ["tsx", "ts", "js", "jsx"],
    "exclude": ["node_modules", ".git"]
};
const dependencies = ["css-utilities-generator", "nodemon", "@babel/generator", "@babel/parser", "@babel/traverse", "@types/babel__generator", "@types/babel__traverse"];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("");
    // 1 Install Dependencies
    console.log(chalk_1.default.gray(`Installing dependencies ${dependencies.join(", ")}..`));
    (0, utils_1.installDependencies)(dependencies);
    console.log(chalk_1.default.gray(`Dependencies Installed Successfully`));
    console.log("");
    // 2 Add command to package.json
    // 2.1 Add script to package.json
    (0, utils_1.addScriptToPackageJson)("utils", "nodemon");
    console.log(chalk_1.default.gray(`Script utils added to package.json.`));
    // 2.2 Generate nodemon.json
    console.log("");
    (0, utils_1.askUser)(`Watch for on save changes at path ${chalk_1.default.yellow.dim.italic(`(default: ${"./"})`)}: `, "", '', (userInput) => __awaiter(void 0, void 0, void 0, function* () {
        if (userInput && (0, utils_1.isValidPath)(userInput)) {
            nodemonJson.watch = [userInput];
            console.log("");
            console.log(`${chalk_1.default.gray(`Changing watch path to `)}${chalk_1.default.white.italic.bold(userInput)}`);
        }
        else {
            console.log("");
            console.log(`${chalk_1.default.gray(`Watch path defaulted to `)}${chalk_1.default.white.italic.bold("./")}`);
        }
        yield (0, utils_1.writeFileInRoot)("nodemon.json", nodemonJson);
        console.log(chalk_1.default.gray(`Cuconfig added Successfully`));
        console.log("");
        // 3 Generate Config File
        console.log(chalk_1.default.gray("Generating Config File.."));
        (0, utils_1.askUser)(`CSS file destination ${chalk_1.default.yellow.dim.italic(`(default: ${cuconfig.writeTo})`)}: `, "", '', (userInput) => {
            if (userInput && (0, utils_1.isValidPath)(userInput)) {
                cuconfig.writeTo = userInput;
                console.log("");
                console.log(`${chalk_1.default.gray(`Changing CSS file destination to `)}${chalk_1.default.white.italic.bold(userInput)}`);
            }
            else {
                console.log("");
                console.log(`${chalk_1.default.gray(`CSS file destination defaulted to `)}${chalk_1.default.white.italic.bold(cuconfig.writeTo)}`);
            }
            (0, utils_1.writeFileInRoot)("cuconfig.json", cuconfig);
            // 4 Generate CSS Utilities
            console.log("");
            console.log(`Congratulations! to generate css utilities on save follow:`);
            console.log("");
            console.log(`    ${chalk_1.default.cyan.bgBlack.bold("npm run utils")}`);
            console.log("");
            console.log(`    ${chalk_1.default.bold("Import your css file in your project")}`);
            console.log("");
        });
    }));
});
main();
