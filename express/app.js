const express = require('express')
const app = express()
const auth = require('./services/user/auth.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use('/auth', auth)





module.exports = app