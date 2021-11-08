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

exports.showUsersTasks = async () => {
  await sequelize.sync()
  const users = await User.findAll({ include: [Task] }) //! seems to be the important line

  users.forEach((user) => {
    console.log(`${user.name} has tasks: `)
    const { tasks } = user
    tasks.forEach((task) => {
      console.log(` * ${task.description}`)
    })
  })
  console.log('done')
  sequelize.close()
}
