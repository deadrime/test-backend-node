import connection from './db'
import faker from 'faker'
import moment from 'moment'

const createBdQuery = `
drop table if exists book;

CREATE TABLE book (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  date DATE DEFAULT NULL,
  author VARCHAR(100) NOT NULL,
  description TEXT DEFAULT NULL,
  image VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE INDEX book_title ON book (title);`

let insertBooksQuery = `insert into book(title, date, author, description, image) values` + Array.from({length: 100000}, () => {
    let title = faker.lorem.words()
    let date = moment(faker.date.past()).toISOString()
    let author = faker.name.findName()
    let description = faker.lorem.paragraph()
    let image = faker.image.image()
    return `("${title}", "${date}", "${author}", "${description}", "${image}")`
}).join(',')

const run = async() => {
    try {
        await connection.query(createBdQuery)
        await connection.query(insertBooksQuery)
        await connection.end()
    } catch(err) {
        console.log(err.message)
    }
}

run().then(() => {
    console.log('Бд успешна создана')
})