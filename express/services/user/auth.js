const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const { User } = require.main.require('./sequelize/models')
const { body, validationResult } = require('express-validator')

// middleware that is specific to this router
router.use((req, res, next) => {
	console.log('Time: ', Date.now())
	next()
})

// middleware handles 500
router.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

router.post(
	'/login',
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
	async (req, res, next) => {
		console.log(typeof User)
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		let { email, password } = req.body

		let existingUser
		try {
			existingUser = await User.findOne({ email: email })
		} catch (error) {
			return next(error)
		}
		if (!existingUser || existingUser.password != password) {
			const error = Error('Authentication failed!')
			return res.status(400).json({ error: error.message })
		}
		try {
			//Creating jwt token

			const accessToken = jwt.sign(
				{
					id: existingUser.id,
					email: existingUser.email
				},
				'process.env.ACCESS_TOKEN_SECRET',
				{
					expiresIn: '5h'
				}
			)

			const refreshToken = jwt.sign(
				{ userId: existingUser.id, email: existingUser.email },
				'process.env.REFRESH_TOKEN_SECRET',
				{ expiresIn: '7d' }
			)

			return res.status(200).json({
				success: true,
				data: {
					userId: existingUser.id,
					email: existingUser.email,
					accessToken: accessToken,
					refreshToken: refreshToken
				}
			})
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}
)

router.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken

	// Verifying refresh token
	jwt.verify(
		refreshToken,
		'process.env.REFRESH_TOKEN_SECRET',
		(err, decoded) => {
			if (err) {
				// Wrong Refesh Token
				return res.status(406).json({ message: 'Unauthorized' })
			} else {
				let { userId, email } = decoded
				// Correct token we send a new access token
				const accessToken = jwt.sign(
					{
						userId: userId,
						email: email
					},
					'process.env.ACCESS_TOKEN_SECRET',
					{
						expiresIn: '5h'
					}
				)
				return res.json({"accessToken": accessToken, "userId": userId})
			}
		}
	)
})

// define the about route
router.get('/about', (req, res) => {
	res.send('About birds')
})

module.exports = router
