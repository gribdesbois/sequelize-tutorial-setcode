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
exports.getRows = async () => {
  const notes = await Note.findAll({
    offset: 2, limit: 3, attributes: ['id', 'description'], raw: true,
  })
  console.log(notes)
  sequelize.close()
}
