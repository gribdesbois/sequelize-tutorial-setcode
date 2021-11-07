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
exports.find_By_Id = () => {
  Note.findByPk(2).then((note) => {
    console.log(note.get({ plain: true }))
    console.log('***********************')
    console.log(`id: ${note.id}, description: ${note.description}`)
  }).finally(() => {
    sequelize.close()
  })
}
