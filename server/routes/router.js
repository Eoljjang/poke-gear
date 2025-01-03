// This is where we access the schemas.
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login through backend...")

    try{
        const user = await schemas.Users.findOne({email});
        if (!user){
            return res.status(404).json({message: "Email does not exist. Please sign up."});
        }
        res.send(200);

        // Compare the passwords
        // const isMatch = await schemas.Users.comparePassword(password);
        // if (!isMatch){
        //     return res.status(401).json({message: "Invalid email or password."});
        // }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error"})
    }

});

router.get("/", async (req, res) => {
    res.send("Hello world!")
})

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
