import mysql from 'promise-mysql'
import config from './config'

const pool = mysql.createPool({
  host: config.mysql.host,
  user:  config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool