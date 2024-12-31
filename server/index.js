const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') // helps with POST-ing.
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router) // router must be at end of file.

const dbOptions = {useNewUrlParse: true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log("DB connected."))
.catch(err => console.log(err))

const port = process.env.PORT || 4000 // Backend runs on port 4000. The frontend can run on another port. You query port 4000 to access the server.
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
