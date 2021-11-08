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

const mytasks1 = [
  { description: 'write memo' }, { description: 'check accounts' },
]

const mytasks2 = [
  { description: 'make two phone calls' },
  { description: 'read new emails' },
  { description: 'arrange meeting' },
]

exports.addUsersTasks = async () => {
  sequelize.sync({ force: true }) //! force: true in our case
    .then(async () => {
      const user1 = await User.create({ name: 'John Doe' })
      const tasks1 = await Task.bulkCreate(mytasks1)

      await user1.setTasks(tasks1)

      const user2 = await User.create({ name: 'Debbie Griffin' })
      const tasks2 = await Task.bulkCreate(mytasks2)

      await user2.setTasks(tasks2)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log('done')
      sequelize.close()
    })
}
