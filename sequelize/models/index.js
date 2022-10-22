
const sequelize = require.main.require('./sequelize')




module.exports.User = require('./user.model')(sequelize)
