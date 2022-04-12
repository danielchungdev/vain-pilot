#!/usr/vin/env node

/**
  ___               _     
 / _ \             (_)    
/ /_\ \_ __  _ __   _ ___ 
|  _  | '_ \| '_ \ | / __|
| | | | |_) | |_) || \__ \
\_| |_/ .__/| .__(_) |___/
      | |   | |   _/ |    
      |_|   |_|  |__/     
 */

const { Client } = require('pg');
const { config } = require('./database/config.js');
const spinner = require('nanospinner');
const inquirer = require('inquirer');
const process = require('process');
const database = require('./database/database'); 
const chalk = require('chalk');       
const client = new Client(config.db);

const chooseMode = async () => {
    const chooseMode = await inquirer.prompt({
        name: "modeSelection",
        type: "list",
        message: "What mode would you like to use:",
        choices: [
            "With logs",
            "Without logs"
        ]
    })
    if (chooseMode.modeSelection === "With logs"){
        return new database.Database(client, 1);
    }
    if (chooseMode.modeSelection === "Without logs"){
        return new database.Database(client, 0);
    } 
}

/**
 * @notes For the database builder to work. It's assumed that you 
 * have an already created database under the name of vain. If you 
 * want the database to be created elsewhere, change the config 
 * file database name. 
 * 
 * @path ./database/database.js
 */
const App = async () => {
    await client.connect();
    let pgdb = null;
    console.log( chalk.green("Welcome to VAIN database manager"));
    const action = await inquirer.prompt({
        name: "userAction",
        type: "list",
        message: "What would you like to do:",
        choices: [
            "Do everything",
            "Drop Database",
            "Create Database",
            "Recreate Database",
            "Read a file",
            "Quit"
        ]
    });
    if (action.userAction === "Do everything"){
        pgdb = await chooseMode();
        const spinDelete = spinner.createSpinner("Deleting tables").start();
        await pgdb.deleteTables();
        spinDelete.success({text: "Deleted tables!"})
        const spinCreate = spinner.createSpinner("Creating tables").start();
        await pgdb.createDatabases();
        spinCreate.success({text: "Created tables!"});
        const spinPopulate = spinner.createSpinner("Populating with constants").start();
        await pgdb.populateDatabase();
        spinPopulate.success({text: "Populated Tables"})
        const spin = spinner.createSpinner('Inserting TSV data').start();
        await pgdb.readFile('vain.tsv')
        await pgdb.insertIntoDatabase('vain.json')
        spin.success({ text: 'DB installation complete!'});
    }
    if (action.userAction === "Drop Database"){
        pgdb = await chooseMode();
        const spinDelete = spinner.createSpinner("Deleting tables").start();
        await pgdb.deleteTables();
        spinDelete.success({text: "Deleted tables!"})
    }
    if (action.userAction === "Create Database"){
        pgdb = await chooseMode();
        const spinCreate = spinner.createSpinner("Creating tables").start();
        await pgdb.createDatabases();
        spinCreate.success({text: "Created tables!"});
    }
    if (action.userAction === "Recreate Database"){
        pgdb = await chooseMode();
        const spinDelete = spinner.createSpinner("Deleting tables").start();
        await pgdb.deleteTables();
        spinDelete.success({text: "Deleted tables!"})
        const spinCreate = spinner.createSpinner("Creating tables").start();
        await pgdb.createDatabases();
        spinCreate.success({text: "Created tables!"});
        const spinPopulate = spinner.createSpinner("Populating with constants").start();
        await pgdb.populateDatabase();
        spinPopulate.success({text: "Populated Tables"})
    }
    if (action.userAction === "Read a file"){
        pgdb = await chooseMode();
        const spin = spinner.createSpinner('inserting data...').start();
        await pgdb.readFile('vain.tsv')
        await pgdb.insertIntoDatabase('vain.json')
        spin.success({ text: 'Successful!'});
    }
    if (action.userAction === "Quit"){
        process.exit(0)
    }
    await pgdb.closeDatabase();

};

App();