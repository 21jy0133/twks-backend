const sequelize = require('./sequelize')

async function reset() {
	console.log(
		'Will rewrite the SQLite example database, adding some dummy data.'
	)

	await sequelize.sync({ force: true })

	await sequelize.models.user.bulkCreate([
		{ email: 'xiaoyuebupt@gmail.com', password: '11111111', isActive: true, isAdmin: true},
		{ email: '21jy0133@jec.ac.jp', password: '11111111', isActive: true }
	])
}

reset()
