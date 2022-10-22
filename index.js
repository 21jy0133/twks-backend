const sequelize = require('./db')
const app = require('./express/app')
const startioServer = require("./socketio")
const http = require('http')
const PORT = 8000

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`)
	try {
		await sequelize.authenticate()
		console.log('Database connection OK!')
	} catch (error) {
		console.log('Unable to connect to the database:')
		console.log(error.message)
	}
}

async function init() {

	await sequelize.sync({ force: false })

	await assertDatabaseConnectionOk()

	console.log(`Starting Sequelize + Express on port ${PORT}...`)

	const server = http.createServer(app)

	startioServer(server)

	server.listen(PORT, () => {
		console.log('Listening:')
	})
}

init()