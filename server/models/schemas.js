// This file is for setting up the table schemas for the database. Do this here instead of online on the Mongo site.
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type: String},
    entryDate: {type: Date, default: Date.now}
})

const Users = mongoose.model('Users', userSchema, 'users')
const mySchemas = {'Users': Users}
module.exports = mySchemas
