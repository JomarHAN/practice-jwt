const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(5000, () => console.log('listening on localhost://5000'))