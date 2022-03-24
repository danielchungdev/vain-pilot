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
const database = require('./database/database');        
const client = new Client(config.db);

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
    await database.deleteTables(client);
    await database.createDatabases(client);
    await client.end();
};

App();