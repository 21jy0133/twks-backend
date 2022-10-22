const sequelize = require('./db')

async function reset() {

	await sequelize.sync({ force: true })


	await sequelize.models.User.bulkCreate([
		{ email: 'xiaoyuebupt@gmail.com', password: '11111111', isActive: true, isAdmin: true},
		{ email: '21jy0133@jec.ac.jp', password: '11111111', isActive: true }
	]).then(function () {
		console.log('User Inserted!')
	})
	.catch(function (err) {
		console.log(err)
	})
}

reset()
