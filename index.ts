#!/usr/bin/env node

import chalk from 'chalk';
import { installDependencies, addScriptToPackageJson, writeFileInRoot, askUser, isValidPath } from './utils';



// Configurations
let nodemonJson = {
    "watch": ["./"], 
    "ext": "tsx,ts,js,jsx", 
    "exec": "node node_modules/css-utilities-generator/dist/generator.js",
    "ignore": ["node_modules/**/*", ".*/**/*"]
}
let cuconfig = {
    "onlyDictionary": true,
    "acceptAnyValue": true,
    "writeTo": "./styles/utilities.css",
    "extensions": ["tsx", "ts", "js", "jsx"],
    "exclude": ["node_modules", ".git"]
    
}
const dependencies = ["css-utilities-generator", "nodemon", "@babel/generator", "@babel/parser", "@babel/traverse", "@types/babel__generator", "@types/babel__traverse"]

const main = async () => {
    console.log("")
    
    // 1 Install Dependencies
    console.log(chalk.gray(`Installing dependencies ${dependencies.join(", ")}..`));
    installDependencies(dependencies);
    console.log(chalk.gray(`Dependencies Installed Successfully`));

    console.log("")

    // 2 Add command to package.json
    // 2.1 Add script to package.json
    addScriptToPackageJson("utils", "nodemon");
    console.log(chalk.gray(`Script utils added to package.json.`));
    // 2.2 Generate nodemon.json
    console.log("")
    askUser(`Watch for on save changes at path ${chalk.yellow.dim.italic(`(default: ${"./"})`)}: `,"", '', async (userInput) => {
        if (userInput && isValidPath(userInput)) {
            nodemonJson.watch = [userInput];
            console.log("")
            console.log(`${chalk.gray(`Changing watch path to `)}${chalk.white.italic.bold(userInput)}`);
        } else {
            console.log("")
            console.log(`${chalk.gray(`Watch path defaulted to `)}${chalk.white.italic.bold("./")}`);
        }

        await writeFileInRoot("nodemon.json",nodemonJson)
        console.log(chalk.gray(`Cuconfig added Successfully`));
        
        console.log("")

    // 3 Generate Config File
        console.log(chalk.gray("Generating Config File.."));
        askUser(`CSS file destination ${chalk.yellow.dim.italic(`(default: ${cuconfig.writeTo})`)}: `,"", '', (userInput) => {
            if (userInput && isValidPath(userInput)) {
                cuconfig.writeTo = userInput;
                console.log("")
                console.log(`${chalk.gray(`Changing CSS file destination to `)}${chalk.white.italic.bold(userInput)}`);
            } else {
                console.log("")
                console.log(`${chalk.gray(`CSS file destination defaulted to `)}${chalk.white.italic.bold(cuconfig.writeTo)}`);
            }
            
            writeFileInRoot("cuconfig.json", cuconfig)
        
    // 4 Generate CSS Utilities
            console.log("")
            console.log(`Congratulations! to generate css utilities on save follow:`);
            console.log("")
            console.log(`    ${chalk.cyan.bgBlack.bold("npm run utils")}`);
            console.log("")
            console.log(`    ${chalk.bold("Import your css file in your project")}`);
            console.log("")
        })
    })
}

main()