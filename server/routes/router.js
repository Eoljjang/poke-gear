// This is where we access the schemas.
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    res.send("skipped");

  });


router.post('/signup', async(req, res) => {
    const {firstName, lastName, password, email} = req.body
    const userData = {firstName: firstName, lastName: lastName, password: password, email: email}
    const newUser = new schemas.Users(userData)
    const saveUser = await newUser.save()
    if (saveUser){
        res.send("New user successfully created")
    }
})

module.exports = router
