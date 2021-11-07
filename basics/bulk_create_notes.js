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

const notes = [
  { description: 'Tai chi in the morning' },
  { description: 'Visited friend' },
  { description: 'Went to cinema' },
  { description: 'Listened to music' },
  { description: 'Watched TC all day' },
  { description: 'walked for an hour' },
]

exports.createInBulk = () => {
  sequelize.sync({ force: true })
    .then(() => {
      Note.bulkCreate(notes, { validate: true })
        .then(() => {
          console.log('notes created')
        }).catch((err) => {
          console.log('failed to create note')
          console.log(err)
        }).finally(() => {
          sequelize.close()
        })
    })
}
