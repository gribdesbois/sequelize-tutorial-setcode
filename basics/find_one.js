const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`

const sequelize = new Sequelize(path, {
  operatorsAliases: false,
  logging: false,
})

const Note = sequelize.define('notes', {
  description: Sequelize.STRING,
})

exports.find_one = () => {
  Note.findOne({ where: { id: 1 } }).then((note) => {
    console.log(note.get({ plain: true }))
  }).finally(() => {
    sequelize.close()
  })
}
