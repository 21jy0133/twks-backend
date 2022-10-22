const express = require('express')
const app = express()
const auth = require('./services/user/auth.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', auth)




module.exports = app