# Vain-pilot

A database and web interface for victorial literature.

## Requirements
1. [Node 16.6+](https://nodejs.org/en/) _recommended_
2. [bun](https://bun.sh) _optional for faster installs_
3. [PostgreSQL](https://www.postgresql.org) _Database_

### How to install
1. Clone the repository with `git clone https://github.com/pikachungg/vain-pilot.git`
2. Look into [How to install database](https://github.com/pikachungg/vain-pilot/edit/main/README.md#how-to-install-database)
3. Go into the vain-pilot folder `cd vain-pilot`
4. Run `npm start` _runs with standard **npm**_ or `npm test` _runs with **bun**_

### How to install database
1. Create a database called vain on PostgreSQL `CREATE DATABASE vain;`
2. Go into the init-database folder `cd init-database`
3. Go into the database folder `cd database`
4. Change the credentials under the file `config.js` to match yours.
