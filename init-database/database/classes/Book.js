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