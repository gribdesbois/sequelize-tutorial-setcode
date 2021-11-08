const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`
const sequelize = new Sequelize(path, { operatorsAliases: false })

const User = sequelize.define('user', {
  name: Sequelize.STRING,
})
const Task = sequelize.define('task', {
  description: Sequelize.STRING,
})

User.hasMany(Task)

exports.createTables = async () => {
  await User.sync()
  await Task.sync()

  console.log('done')
  sequelize.close()
}
