const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const { Op } = Sequelize

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

const employees = [
  { name: 'Jane Brown' }, { name: 'Lucia Benner' }, { name: 'Peter Novak' },
]

exports.belongsToAssociation = async () => {
  sequelize.sync({ force: true })
    .then(() => Employee.bulkCreate(employees))
    .then((employees) => {
      const works = []
      let i = 0

      employees.forEach((employee) => {
        const pname = `Project ${String.fromCharCode('A'.charCodeAt() + i)}`
        i += 1
        const work = Project.create({ name: pname }).then((project) => {
          employee.setProject(project)
        })
        works.push(work)
      })

      // Promise.all(works).then(() => sequelize.close())
      console.log('finish')
    })
}
