// This file is for setting up the table schemas for the database. Do this here instead of online on the Mongo site.
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt'); // for password encryption.
const Schema = mongoose.Schema

const noteSchema = new Schema({
    note_id: {type: String, default: null}, // UUID is a string so we should save it as a string.
    title: {type: String, default: ""},
    note_date: {type: Date, default: Date.now},
    content: {type: String, default: ""},
    last_edited: {type: Date, default: Date.now},
    note_sprite: {type: String, default: ""}
})

const notebookSchema = new Schema({
    notebook_id: {type: String, default: null},
    name: {type: String, defualt: ""}, // What the user decides to name it.
    notebook_sprite: {type: String, default: ""}, // Link to sprite api.
    notes: [noteSchema], // holds "note"
})

const userSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type: String,},
    password: {type:String},
    entryDate: {type: Date, default: Date.now},
    notebooks: [notebookSchema] // holds "notebook"
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
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

const Users = mongoose.model('Users', userSchema, 'users') // no need to export the notebook & note schemas unless you want them to be separate collections (we don't).
const mySchemas = {'Users': Users}
module.exports = mySchemas
