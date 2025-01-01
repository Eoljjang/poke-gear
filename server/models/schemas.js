// This file is for setting up the table schemas for the database. Do this here instead of online on the Mongo site.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt'); // for password encryption.
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type: String,},
    password: {type:String},
    entryDate: {type: Date, default: Date.now}
})

// Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Users = mongoose.model('Users', userSchema, 'users')
const mySchemas = {'Users': Users}
module.exports = mySchemas
