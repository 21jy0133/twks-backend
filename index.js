const app = require('./express/app')
const sequelize = require('./sequelize')
const { Server } = require("socket.io")
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
	await sequelize.sync()
	await assertDatabaseConnectionOk()

	console.log(`Starting Sequelize + Express on port ${PORT}...`)

	const server = http.createServer(app)

	const io = new Server(server)

	io.on('connection', (socket) => {
		console.log('a user connected')
	})

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}.`)
	})
}

init()