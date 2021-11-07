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

exports.findEmployee = async () => {
  Employee.findAll({ include: [Project] }).then((employees) => {
    employees.forEach((employee) => {
      console.log(`${employee.name} is in project ${employee.project.name}`)
    })
  }).finally(() => {
    sequelize.close()
  })
}
