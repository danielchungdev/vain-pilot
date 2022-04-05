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
const Book = require("./classes/Book");

class Database{
    constructor(client){
        this.client = client;
    }

    /**
     * @description execute, is a general purpose function to create database
     * calls from postgres. It should be able to take any command. It's also 
     * an async function because of the necesity that everything must run line
     * by line. Query if requires arguments is expected to be a prepared statement. 
     * 
     * @example Query: 'SELECT * FROM user WHERE id = $1'
     * @example params: [1]
     * 
     * @param {A PG } 
     * @param {String: SQL query} query 
     * @param {Array: String parameters} params 
     * 
     * @returns Result from Postgres.
     */
    execute = async ( query, params = []) => {
        try {
            const res = await this.client.query(query, params);
            if (res) {
                const querySplit = query.split(' ');
                if (querySplit[0] === 'DROP') {
                    console.log(chalk.redBright("DROPPED") + " TABLE " + chalk.blue(`${querySplit[4]}`));
                } 
                if (querySplit[0] === 'CREATE') {
                    console.log(chalk.green("CREATED") + " TABLE " + chalk.blue(`${querySplit[2]}`));
                }
                if (querySplit[0] === 'INSERT') {
                    console.log(chalk.green("INSERTED ") + chalk.yellow(`${params[0]} and ${params[1]}`) + 
                    " INTO TABLE " + chalk.blue(`${querySplit[2]}`));
                    return res.rows;
                }
                if (querySplit[0] === 'SELECT'){
                    return res.rows;
                } 
            }
        } catch (err) {
            console.log("There's been an error!")
            console.log( chalk.red(query) + " did not run!")
            console.log(err);
        }
    };

    /**
     * @description deleteTables is a function that deletes all the tables
     * from the user's postgres database. Promise.all is used to 
     * ensure that all executes happen in order since JavaScript runs
     * in async, without Promise.all DROP's might try to happen after
     * CREATES. Resulting in problems.
     * 
     * @returns None
     */
    deleteTables = async () => {
        return Promise.all([
            console.log("=================================================================="),
            this.execute(`DROP TABLE IF EXISTS book CASCADE`),
            this.execute(`DROP TABLE IF EXISTS namedPerson CASCADE`),
            this.execute(`DROP TABLE IF EXISTS type CASCADE`),
            this.execute(`DROP TABLE IF EXISTS subject CASCADE`),
            this.execute(`DROP TABLE IF EXISTS title CASCADE`),
            this.execute(`DROP TABLE IF EXISTS format CASCADE`),
            this.execute(`DROP TABLE IF EXISTS author CASCADE`),
            this.execute(`DROP TABLE IF EXISTS editor CASCADE`),
            this.execute(`DROP TABLE IF EXISTS translator CASCADE`),
            this.execute(`DROP TABLE IF EXISTS edition CASCADE`),
            this.execute(`DROP TABLE IF EXISTS bookType CASCADE`),
            this.execute(`DROP TABLE IF EXISTS bookSubject CASCADE`),
            this.execute(`DROP TABLE IF EXISTS publisher CASCADE`),
            this.execute(`DROP TABLE IF EXISTS agreement CASCADE`),
            this.execute(`DROP TABLE IF EXISTS bookEdition CASCADE`),
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
     * @returns None
     */
    createDatabases = async () => {
        return Promise.all([
            console.log("=================================================================="),
            //Creation of book
            this.execute(`CREATE TABLE book (
                bookID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
                bookDescriptor VARCHAR(10000),
                bookNote VARCHAR(500)
            )`),
            //Creation of namedPerson
            this.execute(`CREATE TABLE namedPerson (
                namedPersonID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                fname VARCHAR(250) NOT NULL,
                lname VARCHAR(250) NOT NULL,
                nobilityTitle VARCHAR(250),
                lifeYears VARCHAR(250), 
                personNote VARCHAR(250)
            )`),
            //Creation of type
            this.execute(`CREATE TABLE type (
                typeID VARCHAR(50) PRIMARY KEY,
                typeDescription VARCHAR(250) NOT NULL
            )`),
            //Creation of subject
            this.execute(`CREATE TABLE subject (
                subjectID VARCHAR(50) PRIMARY KEY,
                subjectdescription VARCHAR(250) NOT NULL
            )`),
            //Creation of title
            this.execute(`CREATE TABLE title (
                titleID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                titleString VARCHAR(100000) NOT NULL
            )`),
            //Creation of format
            this.execute(`CREATE TABLE format (
                formatID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                formatName VARCHAR(250) NOT NULL
            )`),
            //Creation of author
            this.execute(`CREATE TABLE author (
                namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
                bookID INT NOT NULL REFERENCES book(bookID)
            )`),
            //Creation of editor
            this.execute(`CREATE TABLE editor (
                namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
                bookID INT NOT NULL REFERENCES book(bookID)
            )`),
            //Creation of translator
            this.execute(`CREATE TABLE translator (
                namedPersonID INT NOT NULL REFERENCES namedPerson(namedPersonID),
                bookID INT NOT NULL REFERENCES book(bookID)
            )`),
            //Creation of edition
            this.execute(`CREATE TABLE edition (
                editionID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                editionString VARCHAR(250) NOT NULL
            )`),
            //Creation of bookType
            this.execute(`CREATE TABLE bookType (
                bookID INT NOT NULL REFERENCES namedPerson(namedPersonID), 
                typeID VARCHAR(50) REFERENCES type(typeID)
            )`),
            //Creation of bookSbuject
            this.execute(`CREATE TABLE bookSubject (
                bookID INT NOT NULL REFERENCES book(bookID),
                subjectID VARCHAR(50) REFERENCES subject(subjectID)
            )`),
            //Creation of publisher
            this.execute(`CREATE TABLE publisher (
                publisherID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                publisherName VARCHAR(250),
                publisherLocation VARCHAR(250),
                publisherType VARCHAR(250)
            )`),
            //Creation of agreement
            this.execute(`CREATE TABLE agreement (
                agreementTypeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                agreementTypeName VARCHAR(250), 
                agreementTypeNote VARCHAR(250)
            )`),
            //Creation of bookEdition
            this.execute(`CREATE TABLE bookEdition (
                bookID INT REFERENCES book(bookID),
                editionID INT REFERENCES edition(editionID),
                publisherID INT REFERENCES publisher(publisherID),
                titleID INT REFERENCES title(titleID),
                formatID INT REFERENCES format(formatID),
                formatNote VARCHAR(250),
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
                proceedsAuthor VARCHAR(250)
            )`),
        ]);
    };

    /**
     * @description populateDatabase, fills the database with the pre existing values 
     * like types and subjects, which are stored in json files.
     * 
     * @notes tempted to use this function to write the entire database.
     * 
     */
    populateDatabase = async () => {
        let rawDataType = fs.readFileSync("database/json_files/types.json");
        let rawDataSubject = fs.readFileSync("database/json_files/subjects.json");
        let types = JSON.parse(rawDataType);
        let subjects = JSON.parse(rawDataSubject);
        console.log("==================================================================");
        for (let index in types){
            const query = "INSERT INTO type (typeID, typeDescription) VALUES ($1, $2)";
            const params = [types[index].id, types[index].desc];
            await this.execute(query, params);
        }
        console.log("==================================================================");
        for (let index in subjects){
            const query = "INSERT INTO subject (subjectID, subjectDescription) VALUES ($1, $2)";
            const params = [subjects[index].id, subjects[index].desc];
            await this.execute(query, params);
        }
    }

    insertIfNamedPersonExist = async (namedPerson) => {
        //lastname, firstname, title, year
        let person = namedPerson.split(",");
        try{
            //Check for existing
            let selectQuery = `SELECT * from namedPerson WHERE fname = $1 AND lname = $2`;
            let selectParams = [person[1], person[0]];
            let res = await this.execute(selectQuery);
            if ( res.length > 0){
                return res[0].namedpersonid
            }
            if (person.length === 3){
                //with nobility
                let insertQuery = `INSERT INTO namedperson 
                                        (fname, lname, nobilitytitle)     
                                    VALUES ($1, $2, $3) RETURNING namedperonid`;
                let insertParam = [person[1], person[0], person[2]];
                let resInsert = await this.execute(insertQuery, insertParam);
                return resInsert[0].namedpersonid;
            }   
            else if (person.length === 4){
                //nobility + year
                let insertQuery = `INSERT INTO namedperson
                                    (fname, lname, nobilitytitle, lifeyears) 
                                VALUES 
                                    ($1, $2, $3, $4) RETURNING namedpersonid`;
                let insertParam = [person[1], person[0], person[2], person[3]];
                let resInsert = await this.execute(insertQuery, insertParam); 
                return resInsert[0].namedpersonid;
            }
            else{
                //no nobility 
                let insertQuery = `INSERT INTO namedperson(fname, lname) VALUES ($1, $2) RETURNING namedpersonid`;
                let resInsert = await this.execute(insertQuery, selectParams);
                return resInsert[0].namedpersonid;
            }
        }
        catch(err){
            console.log(err);
        }
    };

    insertIfPublisherExist = async (publisher) => {
        //publishername, publisherlocation
        let publisher = publisher.split(":");
        try{
            //Check for existing
            let selectQuery = `SELECT * from publisher WHERE publisherlocation = $1 publishername = $2`;
            let selectParams = [person[0], person[1]];
            let res = await this.execute(selectQuery, selectParams);
            if ( res.length > 0){
                return res[0].publisherid;
            }
            else {
                let insertQuery = `INSERT INTO publisher(publisherlocation, publishername)  VALUES ($1, $2)`;
                let res = await this.execute(insertQuery, selectParams);
                return res[0].publisherid;
            }
        }
        catch(err){
            console.log(err);
        }
    };

    insertIntoDatabase = async (filename) => {
        let rawBooksFile = fs.readFileSync(`data/output/${filename}`);
        let books = JSON.parse(rawBooksFile);
        console.log(books);
        for (let index in books){
            const bookQuery = "INSERT INTO book (bookdescriptor, booknote) VALUES ($1, $2) RETURNING bookid";
            let bookRes = await this.execute(bookQuery, [books[index].descriptor, books[index].note]);
            let bookid = bookRes[0].bookid;
            let type = books[index].type.toLowerCase();
            let subject = books[index].subject.toLowerCase();
            let authorsList = books[index].author.split(" and ");
            let title = books[index].title;
            let titleQuery = `INSERT INTO title (titlestring) VALUES ($1) RETURNING titleid`;
            let titleRes = await this.execute(titleQuery, [title]);
            let titleid = titleRes[0].titleid;
            let namedPersonID = await this.insertIfNamedPersonExist(authorsList[0]);
            let publisherID = await this.insertIfPublisherExist(books[index].publisher);
            
        }
    }

    /**
     * @description readFile, takes the input file and parses it into a json. Files 
     * should be able to be found in the data/input folder and output json files 
     * will automatically be stored in data/output/filename.json
     * 
     * @param filename: The name of the path we want to read.
     */
    readFile = (filename) => {
        try{
            let count = 0;
            const books = []
            const file = fs.readFileSync(`data/input/${filename}`, {encoding: 'utf-8', flag: 'r'});
            const lines = file.split(/\r?\n/);
            lines.forEach( async (line) => {
                if (count > 0){
                    line = line.split('\t');
                    let book = new Book(line[0], line[1], line[2], line[3], 
                        line[4],line[5],line[6],line[7],line[8],line[9],
                        line[10],line[11]);
                    books.push(book);
                }
                count += 1;
            });
            fs.writeFileSync(`data/output/${filename.split('.')[0]}.json`,JSON.stringify(books));
        }
        catch (err){
            console.error(err);
        }
    }

    closeDatabase = async() => {
        this.client.end();
    }
}

module.exports = { Database };
