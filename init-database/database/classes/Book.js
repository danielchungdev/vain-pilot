/**
______             _      _     
| ___ \           | |    (_)    
| |_/ / ___   ___ | | __  _ ___ 
| ___ \/ _ \ / _ \| |/ / | / __|
| |_/ / (_) | (_) |   < _| \__ \
\____/ \___/ \___/|_|\_(_) |___/
                        _/ |    
                       |__/     
 */

/**
 * @description Class to represent a Book.
 * @note This is only for the TSV file.
 */
class Book{
    constructor(type, authorship, subject, author, title, publisher, year, descriptor, namedPersons, notes, located ){
        this.type = type
        this.authorship = authorship
        this.subject = subject
        this.author = author
        this.title = title
        this.publisher = publisher
        this.year = year
        this.descriptor = descriptor
        this.namedPersons = namedPersons
        this.notes = notes
        this.located = located
    }
}

module.exports = Book;