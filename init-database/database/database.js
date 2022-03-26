/**
     _       _        _                      _     
    | |     | |      | |                    (_)    
  __| | __ _| |_ __ _| |__   __ _ ___  ___   _ ___ 
 / _` |/ _` | __/ _` | '_ \ / _` / __|/ _ \ | / __|
| (_| | (_| | || (_| | |_) | (_| \__ \  __/_| \__ \
 \__,_|\__,_|\__\__,_|_.__/ \__,_|___/\___(_) |___/
                                           _/ |    
                                          |__/      
 */

const chalk = require('chalk');
const fs = require('fs');

/**
 * @description execute, is a general purpose function to create database
 * calls from postgres. It should be able to take any command. It's also 
 * an async function because of the necesity that everything must run line
 * by line. Query if requires arguments is expected to be a prepared statement. 
 * 
 * @example Query: 'SELECT * FROM user WHERE id = $1'
 * @example params: [1]
 * 
 * @param {A PG client} client
 * @param {String: SQL query} query 
 * @param {Array: String parameters} params 
 * 
 * @returns Result from Postgres.
 */
const execute = async (client, query, params = []) => {
    try {
        const res = await client.query(query, params);
        if (res) {
            const querySplit = query.split(' ');
            if (querySplit[0] === 'DROP') {
                console.log(chalk.redBright("DROPPED") + " TABLE " + chalk.blue(`${querySplit[4]}`));
            } 
            else if (querySplit[0] === 'CREATE') {
                console.log(chalk.green("CREATED") + " TABLE " + chalk.blue(`${querySplit[2]}`));
            }
            else if (querySplit[0] === 'INSERT') {
                console.log(chalk.green("INSERTED ") + chalk.yellow(`${params[0]} and ${params[1]}`) + 
                " INTO TABLE " + chalk.blue(`${querySplit[2]}`));
            }
        }
        return res;
    } catch (err) {
        console.log("There's been an error!")
        console.log( chalk.red(query) + " did not run!")
    }
};

/**
 * @description deleteTables is a function that deletes all the tables
 * from the user's postgres database. Promise.all is used to 
 * ensure that all executes happen in order since JavaScript runs
 * in async, without Promise.all DROP's might try to happen after
 * CREATES. Resulting in problems.
 * 
 * @param {A pg Client} Client
 * @returns None
 */
const deleteTables = async (client) => {
    return Promise.all([
        console.log("=================================================================="),
        execute(client, `DROP TABLE IF EXISTS book CASCADE`),
        execute(client, `DROP TABLE IF EXISTS namedPerson CASCADE`),
        execute(client, `DROP TABLE IF EXISTS type CASCADE`),
        execute(client, `DROP TABLE IF EXISTS subject CASCADE`),
        execute(client, `DROP TABLE IF EXISTS title CASCADE`),
        execute(client, `DROP TABLE IF EXISTS format CASCADE`),
        execute(client, `DROP TABLE IF EXISTS author CASCADE`),
        execute(client, `DROP TABLE IF EXISTS editor CASCADE`),
        execute(client, `DROP TABLE IF EXISTS translator CASCADE`),
        execute(client, `DROP TABLE IF EXISTS edition CASCADE`),
        execute(client, `DROP TABLE IF EXISTS bookType CASCADE`),
        execute(client, `DROP TABLE IF EXISTS bookSubject CASCADE`),
        execute(client, `DROP TABLE IF EXISTS publisher CASCADE`),
        execute(client, `DROP TABLE IF EXISTS agreement CASCADE`),
        execute(client, `DROP TABLE IF EXISTS bookEdition CASCADE`),
    ]);
};

/**
 * @description createDatabases is a function that creates the databases
 * for vain. Most ID are set to auto increment and declared as PRIMARY 
 * KEY. If the ID is not set to auto-increment it's most likely a because
 * the value is a string. Just like deleteTables this function is also 
 * async, to ensure that DROP's don't happen after
 * CREATES. Resulting in problems.
 * 
 * @note For quick edit, CTRL + F "Creation of ${table name}" will instantly
 * direct you to the CREATE statement.
 * 
 * @param {A PG client} Client
 * @returns None
 */
const createDatabases = async (client) => {
    return Promise.all([
        console.log("=================================================================="),
        //Creation of book
        execute(client, `CREATE TABLE book (
            bookID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
            bookDescriptor VARCHAR(250),
            bookNote VARCHAR(250)
        )`),
        //Creation of namedPerson
        execute(client, `CREATE TABLE namedPerson (
            namedPersonID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            fname VARCHAR(250) NOT NULL,
            lname VARCHAR(250) NOT NULL,
            nobilityTitle VARCHAR(250),
            lifeYears VARCHAR(250), 
            personNote VARCHAR(250)
        )`),
        //Creation of type
        execute(client, `CREATE TABLE type (
            typeID VARCHAR(50) PRIMARY KEY,
            typeDescription VARCHAR(250) NOT NULL
        )`),
        //Creation of subject
        execute(client, `CREATE TABLE subject (
            subjectID VARCHAR(50) PRIMARY KEY,
            subjectdescription VARCHAR(250) NOT NULL
        )`),
        //Creation of title
        execute(client, `CREATE TABLE title (
            titleID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            titleString VARCHAR(250) NOT NULL
        )`),
        //Creation of format
        execute(client, `CREATE TABLE format (
            formatID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            formatName VARCHAR(250) NOT NULL
        )`),
        //Creation of author
        execute(client, `CREATE TABLE author (
            namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
            bookID INT NOT NULL REFERENCES book(bookID)
        )`),
        //Creation of editor
        execute(client, `CREATE TABLE editor (
            namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
            bookID INT NOT NULL REFERENCES book(bookID)
        )`),
        //Creation of translator
        execute(client, `CREATE TABLE translator (
            namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
            bookID INT NOT NULL REFERENCES book(bookID)
        )`),
        //Creation of edition
        execute(client, `CREATE TABLE edition (
            editionID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            editionString VARCHAR(250) NOT NULL
        )`),
        //Creation of bookType
        execute(client, `CREATE TABLE bookType (
            bookID INT NOT NULL REFERENCES namedPerson(namedPersonID), 
            typeID VARCHAR(50) REFERENCES type(typeID)
        )`),
        //Creation of bookSbuject
        execute(client, `CREATE TABLE bookSubject (
            bookID INT NOT NULL REFERENCES book(bookID),
            subjectID VARCHAR(50) REFERENCES subject(subjectID)
        )`),
        //Creation of publisher
        execute(client, `CREATE TABLE publisher (
            publisherID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            publisherName VARCHAR(250),
            publisherLocation VARCHAR(250),
            publisherType VARCHAR(250)
        )`),
        //Creation of agreement
        execute(client, `CREATE TABLE agreement (
            agreementTypeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            agreementTypeName VARCHAR(250), 
            agreementTypeNote VARCHAR(250)
        )`),
        //Creation of bookEdition
        execute(client, `CREATE TABLE bookEdition (
            bookID INT REFERENCES book(bookID),
            editionID INT REFERENCES edition(editionID),
            publisherID INT REFERENCES publisher(publisherID),
            titleID INT REFERENCES title(titleID),
            formatID INT REFERENCES format(formatID),
            year VARCHAR(250),
            yearNote VARCHAR(250),
            numberPages INT,
            numberVolumes VARCHAR(250),
            agreementTypeID INT REFERENCES agreement(agreementTypeID),
            salePrice INT,
            paymentAgreedAmount INT,
            illustrations VARCHAR(250),
            illustrationsPayment INT,
            copiesSold INT,
            copiesRemaining INT,
            profitLoss INT,
            proceedsAuthor VARCHAR(250),
            formatNote VARCHAR(250)
        )`),
    ]);
};

/**
 * @description populateDatabase, fills the database with the pre existing values 
 * like types and subjects, which are stored in json files.
 * 
 * @notes tempted to use this function to write the entire database.
 * 
 * @param {PG Client} client 
 */
const populateDatabase = async (client) => {
    let rawDataType = fs.readFileSync("database/json_files/types.json");
    let rawDataSubject = fs.readFileSync("database/json_files/subjects.json");
    let types = JSON.parse(rawDataType);
    let subjects = JSON.parse(rawDataSubject);
    console.log("==================================================================");
    for (let index in types){
        const query = "INSERT INTO type (typeID, typeDescription) VALUES ($1, $2)";
        const params = [types[index].id, types[index].desc];
        await execute(client, query, params);
    }
    console.log("==================================================================");
    for (let index in subjects){
        const query = "INSERT INTO subject (subjectID, subjectDescription) VALUES ($1, $2)";
        const params = [subjects[index].id, subjects[index].desc];
        await execute(client, query, params);
    }
}

module.exports = { execute, deleteTables, createDatabases, populateDatabase };