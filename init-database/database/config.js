/**
 _____              __ _         _     
/  __ \            / _(_)       (_)    
| /  \/ ___  _ __ | |_ _  __ _   _ ___ 
| |    / _ \| '_ \|  _| |/ _` | | / __|
| \__/\ (_) | | | | | | | (_| |_| \__ \
 \____/\___/|_| |_|_| |_|\__, (_) |___/
                          __/ |_/ |    
                         |___/|__/     
 */

/**
 * @object config is the object that contains information used 
 * to establish the connection with postgres. This can change 
 * between systems so feel free to change it to your database 
 * credentials. :)
 * 
 * @notes For the database builder to work it's assumed that 
 * you have a vain database created. 
 */
const config = {
	db: {
		host: 'localhost',
		port: '5432',
		user: 'postgres',
		password: 'student',
		database: 'vain'
	}
};

module.exports = { config }

