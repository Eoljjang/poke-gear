const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') // helps with POST-ing.
const router = require('./routes/router')
const mongoose = require('mongoose')
const path = require("path")
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

// ------------- Deployment ----------------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1, "../client/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "../client/dist", "index.html"))
    })

}
else {
    app.get("/", (req, res) => {
        res.send("API is running successfully.")
    })
}

// ------------- Deployment ----------------


app.use(cors(corsOptions))
app.use('/', router) // router must be at end of file.

const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log("DB connected."))
.catch(err => console.log("Connect to DB Failed: " + err))

const port = process.env.PORT || 4000 // Backend runs on port 4000. The frontend can run on another port. You query port 4000 to access the server.
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
