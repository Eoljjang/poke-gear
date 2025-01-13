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
    origin: "*",
    credentials: true,
    optionsSucessStatus: 200,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
}
app.use(cors(corsOptions))
app.use('/', router) // router must be at end of file.

const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true} // no need to use db options since they've been deprecated. Try adding it in again if it breaks the program.
mongoose.connect(process.env.DB_URI)
.then(() => console.log("DB connected."))
.catch(err => console.log(err))

const port = process.env.PORT || 4000 // Backend runs on port 4000. The frontend can run on another port. You query port 4000 to access the server.
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
