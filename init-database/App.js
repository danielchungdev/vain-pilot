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

/**
 * @param None
 * 
 * @description chooseMode is a function that uses inquirer
 * to ask the user if the action should be run with or without
 * logs. Logs make it easier to debug as it gives you an idea 
 * of what commands are being input into the database.
 * 
 * @returns an instance of the database. 
 * 0 signifies no logs
 * 1 signifies logs.
 */
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
 * @param {postgres instance} pgdb 
 * @description deleteTables drops all tables from the database.
 * @returns None
 */
const deleteTables = async (pgdb) => {
    const spinDelete = spinner.createSpinner("Deleting tables\n").start();
    await pgdb.deleteTables();
    spinDelete.success({text: "Deleted tables!"})
}

/**
 * @param {postgres instance} pgdb 
 * @description createTables creates all tables for the database.
 * @returns None
 */
const createTables = async (pgdb) => {
    const spinCreate = spinner.createSpinner("Creating tables").start();
    await pgdb.createDatabases();
    spinCreate.success({text: "Created tables!"});
}

/**
 * @param {postgres instance} pgdb 
 * @description populateDatabase populates the necessary tables for 
 * the database.
 * @returns None
 */
const populateDatabase = async (pgdb) => {
    const spinPopulate = spinner.createSpinner("Populating with constants").start();
    await pgdb.populateDatabase();
    spinPopulate.success({text: "Populated Tables"})
}

/**
 * @param {postgres instance} pgdb 
 * @description insertFileTodatabase inserts into the database 
 * from the contents of the tsv file.
 * @returns None
 */
const insertFiletoDatabase = async (pgdb) => {
    const spin = spinner.createSpinner('Inserting TSV data').start();
    await pgdb.readFile('vain.tsv')
    await pgdb.insertIntoDatabase('vain.json')
    spin.success({ text: 'DB installation complete!'});
}

/**
 * @NOTE For the database builder to work. It's assumed that you 
 * have an already created database under the name of vain. If you 
 * want the database to be created elsewhere, change the config 
 * file (./database/config.js) database name.
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
        await deleteTables(pgdb);
        await createTables(pgdb);
        await populateDatabase(pgdb);
        await insertFiletoDatabase(pgdb);
    }
    if (action.userAction === "Drop Database"){
        pgdb = await chooseMode();
        await deleteTables(pgdb);
    }
    if (action.userAction === "Create Database"){
        pgdb = await chooseMode();
        await createTables(pgdb);
    }
    if (action.userAction === "Recreate Database"){
        pgdb = await chooseMode();
        await deleteTables(pgdb);
        await createTables(pgdb);
        await populateDatabase(pgdb);
    }
    if (action.userAction === "Read a file"){
        pgdb = await chooseMode();
        await insertFiletoDatabase(pgdb);
    }
    if (action.userAction === "Quit"){
        process.exit(0)
    }
    await pgdb.closeDatabase();

};

App();