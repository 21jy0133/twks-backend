const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const db = require.main.require('./db')

module.exports = (server) => {
	const io = new Server(server)

	console.log('db.models', db.models)

	io.use(function (socket, next) {
		console.log(socket.handshake)
		if (socket.handshake.auth && socket.handshake.auth.accessToken) {
			console.log(socket.handshake)
			jwt.verify(
				socket.handshake.auth.accessToken,
				'process.env.ACCESS_TOKEN_SECRET',
				function (err, decoded) {
					if (err) return next(new Error('Authentication error'))
					let { userId, email } = decoded

					console.log('userId', userId)
					console.log('decoded', decoded)
					socket.uid = userId
					socket.email = email
					next()
				}
			)
		} else {
			next(new Error('Authentication error'))
		}
	}).on('connection', function (socket) {
		// Connection now authenticated to receive further events

		console.log('connected')

		socket.on('event', function (event) {
			console.log('event.', event)
			console.log('user.', socket.uid)

			try {
				db.models.Event.create(
					{
						data: event.data,
						type: event.type,
						ownerId: socket.uid
					},
					{ include: ['owner'] }
				)
					.then(function () {
						console.log('Inserted!')
					})
					.catch(function (err) {
						console.log(err)
					})
			} catch (error) {
				console.log('event fetch error:', error)
			}
		})
	})
}
