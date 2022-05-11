const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Livro = require('../models/Livro')

const connection = new Sequelize(process.env.DATABASE_URL, dbConfig)

User.init(connection)
Livro.init(connection)

User.associate(connection.models)
Livro.associate(connection.models)

module.exports = connection

