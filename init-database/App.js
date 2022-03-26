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
const inquirer = require('inquirer');
const fs = require("fs");
const { config } = require('./database/config.js');
const database = require('./database/database');        
const Book = require("./database/classes/Book");
const client = new Client(config.db);

const readFile = (filename) => {
    try{
        const data = fs.readFileSync(filename, "UTF-8");
        const lines = data.split(/\r?\n/);
        lines.forEach( (line) => {
            line = line.split('\t');
            let book = new Book(line[0], line[1], line[2], line[3], 
                line[4],line[5],line[6],line[7],line[8],line[9],
                line[10],line[11]);
            books.push(book);
            return books;
        })
    }
    catch (err){
        console.error(err);
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
    const action = await inquirer.prompt({
        name: "userAction",
        type: "list",
        message: "What would you like to do: \n",
        choices: [
            "Drop Database.",
            "Create Database.",
            "Recreate Database."
        ]
    });
    if (action.userAction === "Drop Database."){
        await database.deleteTables(client);
        console.log("\nAll tables dropped!")
    }
    if (action.userAction === "Create Database."){
        await database.createDatabases(client);
        await database.populateDatabase(client);
        console.log("\nDatabase Created!")
    }
    if (action.userAction === "Recreate Database."){
        await database.deleteTables(client);
        await database.createDatabases(client);
        await database.populateDatabase(client);
        console.log("\nDatabase dropped and recreated!")
    }
    await client.end();
};

App();