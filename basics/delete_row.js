const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`
const sequelize = new Sequelize(path, { operatorsAliases: false })

const Note = sequelize.define('notes', {
  description: Sequelize.STRING,
})
exports.deleteRow = async () => {
  const n = await Note.destroy({ where: { id: 2 } })
  console.log(`number of deleted rows: ${n}`)
  sequelize.close()
}
