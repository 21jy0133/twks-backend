const { Sequelize } = require('sequelize')
const { applyRelationsSetup } = require('./extra-setups/relations')

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize("postgres://twks_db_user:twks_db_pw@127.0.0.1:5432/twks")

const modelDefiners = [
	require('./models/user.model')
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
applyRelationsSetup(sequelize)

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize