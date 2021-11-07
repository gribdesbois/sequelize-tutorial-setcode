const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`
const sequelize = new Sequelize(path, { operatorsAliases: false })

module.exports = () => {
  sequelize.authenticate().then(() => {
    console.log('Connection established successfully.')
  }).catch((err) => {
    console.error('Unable to connect to the database:', err)
  }).finally(() => {
    sequelize.close()
  })
}
