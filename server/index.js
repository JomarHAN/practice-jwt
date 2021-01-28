const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

//Register and Login routes
app.use('/auth', require('./routes/jwtAuth'))

app.listen(5000, () => console.log('listening on localhost://5000'))