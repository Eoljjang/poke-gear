// This is where we access the schemas.
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas');

router.get("/", async (req, res) => {
    res.send("Hello world!")
})

// -------- LOGIN AND SIGNUP --------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login through backend...")

    try{
        const user = await schemas.Users.findOne({email});
        if (!user){
            return res.status(404).json({message: "Email does not exist. Please sign up."});
        }

        if (password !== user.password){
            return res.status(401).json({message: "Password is incorrect."});
        }
        res.status(200).json({message: "Login successful.", userEmail: email});

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

router.post('/signup', async(req, res) => {
    const {firstName, lastName, password, email} = req.body

    // Check if the email already exists.
    try{
        const user = await schemas.Users.findOne({email});
        if (user){
            return res.status(404).json({message: "Email already exists. Please log in."});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error. Could not check if email already exists."})
    }

    // Now create the new user.
    try{
        const userData = {firstName: firstName, lastName: lastName, password: password, email: email}
        const newUser = new schemas.Users(userData)
        const saveUser = await newUser.save()
        if (saveUser){
            return res.status(200).json({message: "Successfully created a new user."})
        }
    }
    catch(error){
        return res.status(500).json({message: "Server error. Unable to create new user."})
    }
})

// -------- LOAD USER DATA --------------
router.post("/getUserData", async (req, res) => {
    const {userEmail} = req.body;
    try {
        const user = await schemas.Users.findOne({email: userEmail});
        if (!user){
            return res.status(404).json({message: "Unable to retrieve user data for some reason. User does not exist."})
        }
        res.send(user.notebooks);
    }
    catch (e){
        return res.status(500).json({message: "Error when retrieving user data:", e})
    }
})

// -------- LIVE SYNCING DATA WITH DB --------------
router.post('/syncUserData', async(req, res) => {
    // Note that userData is their notebooks collection (which includes notes).
    // - it does not include the top level user information such as their name, password, etc.
    const {userEmail, userData} = req.body;
    console.log("syncing data...")

    try{
        const user = await schemas.Users.findOne({email: userEmail});

        // Update all user fields and their sub collections whenever there's a change.
        user.notebooks = userData;

        await user.save();
        res.status(200).json({message: "User data synced successfully."})
        console.log("User data synced successfully.")

    }
    catch(e){
        console.error("Error when syncing data:", e)
    }
})

router.post('/saveQuickNote', async(req, res) => {
    const {title, content, notebook_id} = req.body;

    // 0) If the user does not input anything, no quicknote is created
    if (!title && !content){
        return;
    }

    // 1) If user doesn't input a title

    // 2) If user doesn't input any content

    // 3) If user doesn't select a notebook.

    // 4) If the user DID select a notebook.
    console.log('received:', title, content)
    console.log('Notebook ID:', notebook_id)

})

module.exports = router
