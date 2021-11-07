const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const { Op } = Sequelize

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
  const notes = await Note.findAll({ where: { id: { [Op.in]: [3, 6] } } })
  notes.forEach((note) => {
    console.log(`${note.id}: ${note.description}`)
  })
  sequelize.close()
}
