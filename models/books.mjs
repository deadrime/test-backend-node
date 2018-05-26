import pool from '../db'
import moment from 'moment'

const Books = {
    async getAll({offset = 0, limit = 1000, orderBy = 'id', groupBy = []} = {}) {
        const possibleFields = ['id', 'title', 'date', 'author', 'description', 'image']
        if (!possibleFields.includes(orderBy)) {
            throw Error(`Wrong orderBy value ${orderBy}. Only the following values are available: ${possibleFields.join(', ')}.`)
        }
        if (!groupBy.every(value => possibleFields.includes(value))) {
            throw Error(`Wrong groupBy value ${groupBy}. Only the following values are available: ${possibleFields.join(', ')}.`)
        }
        const sql = `
            SELECT * FROM book
            ${groupBy.length > 0 ? 'GROUP BY ' + groupBy.join(',') : ''}
            ORDER BY ${String(orderBy)}
            LIMIT ${Number(limit)} OFFSET ${Number(offset)}`
        const results = await pool.query(sql)
        return results
    },
    async get(id) {
        const sql = `
            SELECT * FROM book
            WHERE id = ?`
        const results = await pool.query(sql, Number(id))
        return results[0]
    },
    async create({title, date, author, description, image}) {
        if (!title || !date || !author || !description || !image) throw Error('Need title, date, author, description, image ')
        const book = {
            title: String(title),
            author: String(author),
            date: moment(date).toISOString(),
            description: String(description),
            image: String(image)
        }
        const sql = `
            INSERT INTO book
            SET ?
            ON DUPLICATE KEY UPDATE ?`
        let {insertId} = await pool.query(sql, [book, book])
        return this.get(insertId)
    },
    async update(id, info) {
        if (typeof info === 'object') {
            if (!('id' in info || 'title' in info || 'author' in info ||  'date' in info || 'description' in info || 'image' in info)) {
                throw Error('Wrong input')
            }
        }
        const sql = `
            UPDATE book
            SET ?
            WHERE id = ?`
        let {affectedRows} = await pool.query(sql, [info, Number(id)])
        return affectedRows
    }
}

export default Books