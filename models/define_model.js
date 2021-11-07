const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`
const sequelize = new Sequelize(path, { operatorsAliases: false })

const Dummy = sequelize.define('dummy', {
  description: Sequelize.STRING,
})

exports.Dummy = () => {
  Dummy.sync().then(() => {
    console.log('new table created')
  }).finally(() => {
    sequelize.close
  })
}
