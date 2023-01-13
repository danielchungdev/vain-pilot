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
    /**
     * @description Constructor for the database class.
     * @param {*} client 
     * @param {*} mode 
     */
    constructor(client, mode){
        this.client = client;
        this.mode = mode;
    }

    /**
     * @description execute, is a general purpose function to create database
     * calls from postgres. It should be able to take any command. It's also 
     * an async function because of the necesity that everything must run line
     * by line. Query if requires arguments is expected to be a prepared statement. 
     * 
     * @Tips Uncomment console logs to get details of what's being updated.
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
                    if (this.mode === 1){
                        console.log(chalk.redBright("DROPPED") + " TABLE " + chalk.blue(`${querySplit[4]}`));
                    }
                } 
                if (querySplit[0] === 'CREATE') {
                    if (this.mode === 1){
                        console.log(chalk.green("CREATED") + " TABLE " + chalk.blue(`${querySplit[2]}`));
                    }
                }
                if (querySplit[0] === 'INSERT') {
                    if (this.mode === 1){
                        console.log(chalk.green("INSERTED ") + chalk.yellow(`${params[0]} and ${params[1]}`) + 
                        " INTO TABLE " + chalk.blue(`${querySplit[2]}`));
                    }
                    return res.rows;
                }
                if (querySplit[0] === 'SELECT'){
                    return res.rows;
                } 
            }
        } catch (err) {
            console.error( chalk.red(query) + " did not run!")
            console.error(err);
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
            this.execute(`DROP TABLE IF EXISTS users CASCADE`),
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
                lname VARCHAR(250),
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
                bookID INT NOT NULL REFERENCES book(bookID), 
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
                numberPages VARCHAR(250),
                numberVolumes VARCHAR(250),
                agreementTypeID INT REFERENCES agreement(agreementTypeID),
                salePrice VARCHAR(250),
                paymentAgreedAmount VARCHAR(250),
                illustrations VARCHAR(250),
                illustrationsPayment VARCHAR(250),
                copiesSold VARCHAR(250),
                copiesRemaining VARCHAR(250),
                profitLoss VARCHAR(250),
                proceedsAuthor VARCHAR(250)
            )`),
            this.execute(`CREATE TABLE users (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                fname VARCHAR(250),
                lname VARCHAR(250),
                username VARCHAR(250) UNIQUE,
                password VARCHAR(250),
                email VARCHAR(250) UNIQUE
            )`),
        ]);
    };

    /**
     * @description populateDatabase, fills the database with the pre existing values 
     * like types and subjects, which are stored in json files.
     * @returns None
     */
    populateDatabase = async () => {
        let rawDataType = fs.readFileSync("database/json_files/types.json");
        let rawDataSubject = fs.readFileSync("database/json_files/subjects.json");
        let rawDataEdition = fs.readFileSync("database/json_files/edition.json");
        let types = JSON.parse(rawDataType);
        let subjects = JSON.parse(rawDataSubject);
        let editions = JSON.parse(rawDataEdition);
        /**
         * @TODO change these (232-239), these are default values for tables.
         */
        const tempParam = ["temporary"];
        const tempPublisher = "INSERT INTO publisher(publishername, publisherlocation) VALUES ($1, $2)";
        const publisherParam = ["No", "Publisher"];
        await this.execute(tempPublisher, publisherParam);
        const tempFormat = "INSERT INTO format(formatname) VALUES ($1)";
        await this.execute(tempFormat, tempParam);
        const tempAgreement = "INSERT INTO agreement(agreementtypename) VALUES ($1)";
        await this.execute(tempAgreement, tempParam);
        const unknownAuthor = "INSERT INTO namedperson (fname, lname) VALUES ($1, $2)";
        await this.execute(unknownAuthor, ["Unknown", "Author"]);
        for (let index in editions){ //Reads through all objects from the edition.json file
            const query = "INSERT INTO edition (editionstring) VALUES ($1)";
            const params = [editions[index].edition];
            await this.execute(query, params);
        }

        for (let index in types){ //Reads through all objects from the types.json file
            const query = "INSERT INTO type (typeID, typeDescription) VALUES ($1, $2)";
            const params = [types[index].id, types[index].desc];
            await this.execute(query, params);
        }

        for (let index in subjects){ //Reads through all objects from the subjects.json file
            const query = "INSERT INTO subject (subjectID, subjectDescription) VALUES ($1, $2)";
            const params = [subjects[index].id, subjects[index].desc];
            await this.execute(query, params);
        }
    }

    /**
     * @description insertIfNamedPersonExist this function first searches to see if the
     * named person already exists. If it does then returns such ID. Else it will parse 
     * the named person information and insert it into the database.
     * @param {String(lastname, firstname, nobilitytitle, year)} namedPerson
     * @returns named person's id.
     */
    insertIfNamedPersonExist = async (namedPerson) => {
        try{
            //Check for existing named person.
            if (namedPerson.length === 1){
                let fname = namedPerson[0].trim();
                let params = [fname];
                let verification = `SELECT * FROM namedPerson WHERE fname = $1`;
                let verificationRes = await this.execute(verification, params);
                if (verificationRes.length > 0){
                    return verificationRes[0].namedpersonid;
                }
                else{
                    let insertQuery = `INSERT INTO namedperson (fname) VALUES ($1) RETURNING namedpersonid`;
                    let insertRes = await this.execute(insertQuery, params);
                    return insertRes[0].namedpersonid;
                }
            }
            else if (namedPerson.length === 2){
                let fname = namedPerson[1].trim();
                let lname = namedPerson[0].trim();
                let params = [fname, lname];
                let verification = `SELECT * FROM namedPerson WHERE fname = $1 AND lname = $2`;
                let verificationRes = await this.execute(verification, params);
                if (verificationRes.length > 0){
                    return verificationRes[0].namedpersonid;
                }
                else{
                    let insertQuery = `INSERT INTO namedperson (fname, lname) VALUES ($1 ,$2) RETURNING namedpersonid`;
                    let insertRes = await this.execute(insertQuery, params);
                    return insertRes[0].namedpersonid;
                }
            }
            else if (namedPerson.length === 3){
                let fname = namedPerson[1].trim();
                let lname = namedPerson[0].trim();
                let nobilityTitle = namedPerson[2].trim();
                let params = [fname, lname, nobilityTitle];
                let verification = `SELECT * FROM namedPerson WHERE fname = $1 AND lname = $2 AND nobilitytitle = $3`;
                let verificationRes = await this.execute(verification, params);
                if (verificationRes.length > 0){
                    return verificationRes[0].namedpersonid;
                }
                else{
                    let insertQuery = `INSERT INTO namedperson (fname, lname, nobilitytitle) VALUES ($1, $2, $3) RETURNING namedpersonid`;
                    let insertRes = await this.execute(insertQuery, params);
                    return insertRes[0].namedpersonid;
                }
            }
            else if (namedPerson.length === 4){
                let fname = namedPerson[1].trim();
                let lname = namedPerson[0].trim();
                let nobilityTitle = namedPerson[2].trim();
                let yearsLived = namedPerson[3].trim();
                let params = [fname, lname, nobilityTitle, yearsLived];
                let verification = `SELECT * FROM namedPerson WHERE fname = $1 AND lname = $2 AND nobilitytitle = $3 AND lifeyears = $4`;
                let verificationRes = await this.execute(verification, params);
                if (verificationRes.length > 0){
                    return verificationRes[0].namedpersonid;
                }
                else{
                    let insertQuery = `INSERT INTO namedperson (fname, lname, nobilitytitle, lifeyears) VALUES ($1, $2, $3, $4) RETURNING namedpersonid`;
                    let insertRes = await this.execute(insertQuery, params);
                    return insertRes[0].namedpersonid;
                }
            }
        }
        catch(err){
            console.log(err);
        }
    };

    /**
     * @description insertIfPublisherExist, this function searches for the publisher, 
     * if the publisher exists then returns it's id. Otherwise it inserts it into the
     * database and returns the id.
     * @param {String(Location:name)} publisher 
     * @returns publisher's id.
     */
    insertIfPublisherExist = async (publisher) => {
        try{
            //Check for existing
            publisher = publisher.split(":");
            let selectQuery = `SELECT * from publisher WHERE publisherlocation = $1 AND publishername = $2`;
            let selectParams = [publisher[0], publisher[1]];
            let res = await this.execute(selectQuery, selectParams);
            if ( res.length > 0){
                return res[0].publisherid;
            }
            else {
                //Doesn't exist, proceed with inserting.
                let insertQuery = `INSERT INTO publisher(publisherlocation, publishername)  VALUES ($1, $2) RETURNING publisherid`;
                let res = await this.execute(insertQuery, selectParams);
                return res[0].publisherid;
            }
        }
        catch(err){
            console.log(err);
        }
    };

    insertIntoEdition = async (edition) => {
        let insertQuery = `INSERT INTO edition(editionstring) VALUES ($1) RETURNING editionid`;
        let res = await this.execute(insertQuery, [edition]);
        return res[0].editionid;
    };

    /**
     * @description insertIntoDatabase is a function that parses every property of the book, 
     * inserts it and gets all the required id's that are used as foreign keys for bookedition.
     * then proceeds to insert it to bookedition and all other tables.
     * @param {JSON file} filename 
     * @returns None.
     */
    insertIntoDatabase = async (filename) => {
        let rawBooksFile = fs.readFileSync(`data/output/${filename}`);
        let books = JSON.parse(rawBooksFile);
        for (let index in books){
            let descriptor = books[index].descriptor.split(";");
            let volume = descriptor[0];
            let edition = descriptor[1];
			let year = books[index].year;
            let editionid = 1
            if (edition !== ' ' && edition !== undefined){
                editionid = await this.insertIntoEdition(edition);
            }
            let pages = descriptor[2];
            let comments = descriptor.slice(3).join('');
            const bookQuery = "INSERT INTO book (bookdescriptor, booknote) VALUES ($1, $2) RETURNING bookid";
            let bookRes = await this.execute(bookQuery, [comments, books[index].note]);
            let bookid = bookRes[0].bookid;
            let type = "unk";
            let subject = ["unk"];
            if (books[index].type !== ""){
                if (books[index].type === "unknown"){
                    type= "unk"
                }
                else{
                    type = books[index].type.toLowerCase();
                }
            }
            if (books[index].subject !== ""){
                subject = books[index].subject.split(",");
            }
            let authorsList = books[index].author.split(" and ");
            let title = books[index].title.trim();
            const titleQuery = `INSERT INTO title (titlestring) VALUES ($1) RETURNING titleid`;
            let titleRes = await this.execute(titleQuery, [title]);
            let titleid = titleRes[0].titleid;
            let publisherid = 1
            if (books[index].publisher !== ""){ //Inserts into publisher
                publisherid = await this.insertIfPublisherExist(books[index].publisher);
            }
            for (let i = 0; i < authorsList.length; i++){ //Inserts into the author and the bookid.
                let namedPersonID = await this.insertIfNamedPersonExist(authorsList[i].split(','));
                if (namedPersonID == null){
                    namedPersonID = 1
                }
                const authorQuery = "INSERT INTO author (namedPersonID, bookid) VALUES ($1, $2)";
                await this.execute(authorQuery, [namedPersonID, bookid]);
            }
            for (let j = 0; j < subject.length; j++){ //Inserts into booksubject.
                let sub = subject[j].trim().toLowerCase()
                if (sub === "?" || sub === "unknown" || sub === "????"){
                    sub = "unk"
                }
                const booksubjectQuery = "INSERT INTO booksubject (bookid, subjectid) VALUES ($1, $2)";
                const booksubjectParams = [bookid, sub];
                await this.execute(booksubjectQuery, booksubjectParams);
            }
            const booktypeQuery = "INSERT INTO booktype (bookid, typeid) VALUES ($1, $2)";
            const booktypeParams = [bookid, type];
            await this.execute(booktypeQuery, booktypeParams);
            /**
             * @TODO Fix these values depending on file.
             */
            let formatid = 1;
            let agreementTypeID = 1;

            const bookeditionQuery = `INSERT INTO bookedition
                                        (bookid, editionid, publisherid, titleid, formatid, agreementtypeid, numbervolumes, year, numberpages) 
                                    VALUES
                                        ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            const bookeditionParam = [bookid, editionid, publisherid, titleid, formatid, agreementTypeID, volume, year, pages];
            await this.execute(bookeditionQuery, bookeditionParam);
        }
    };

    /**
     * @description readFile, takes the input file and parses it into a json. Files 
     * should be able to be found in the data/input folder and output json files 
     * will automatically be stored in data/output/filename.json
     * @note file must be TSV. Otherwise won't work.
     * @param {file must be on '/data/input'} filename: The name of the path we want to read.
     * @returns None.
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