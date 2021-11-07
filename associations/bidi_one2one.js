const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const {
  DIALECT, DB_USER, WORD, TEST_DB, DB_URL,
} = process.env

const path = `${DIALECT}://${DB_USER}:${WORD}@${DB_URL}${TEST_DB}`
const sequelize = new Sequelize(path, { operatorsAliases: false })

const Employee = sequelize.define('employees', {
  name: Sequelize.STRING,
})

const Project = sequelize.define('projects', {
  name: Sequelize.STRING,
})

Employee.belongsTo(Project)
Project.hasOne(Employee)

exports.bidiExample = async () => {
  Project.findAll({ include: [Employee] }).then((projects) => {
    projects.forEach((project) => {
      console.log(`${project.name} belongs to user ${project.employee.name}`)
    })
  }).finally(() => {
    sequelize.close()
  })
}
