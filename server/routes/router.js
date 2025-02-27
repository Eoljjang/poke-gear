// This is where we access the schemas.
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const axios = require('axios');

router.get("/", async (req, res) => {
    res.send("Hello world!")
})

// -------- LOGIN AND SIGNUP --------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login through backend...")
    try{
        const response = await verifyLogin(email, password) // Calls this function that handles all login logic.

        if (response.status === 'ok'){
            // Stores JWT token as a cookie in the browser.
            //res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json({message: "Login successful.", userEmail: email});
        }

        else{
            return res.status(401).json({message: "Password is incorrect."});
        }
    }
    catch(e){
        console.log('login error:', e);
        req.status(500, {message: "Server error"})
    }

});

// Function for decrypting password from db.
const verifyLogin = async(email, password) => {
    try{
        const user = await schemas.Users.findOne({email}).lean()
        if (!user){
            return {status:'error',error:'user not found'}
        }
        // Compare the 2 passwords
        if (await bcrypt.compare(password, user.password)){
            // This essentially creates a "session token" for a given user that's logged in.
            //let token = jwt.sign({id:user._id, email: user.email, type:"user"}, JWT_SECRET, {expiresIn: '2h'})
            return {status:'ok'}//,data:token}
        }
        // If password is wrong
        return {status:'error',error:'invalid password'}
    }
    catch(error){
        console.log(error)
        return {status:'error',error:'timed out'}
    }
}

router.post('/signup', async(req, res) => {
    const {firstName, lastName, password, email} = req.body

    // Encrypt pw
    const saltRounds = 10;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);

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
        const userData = {firstName: firstName, lastName: lastName, password: passwordEncrypted, email: email}
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
    // Note: TItle, content, and notebook_id have been asserted to be non-null at this point.
    const {title, content, notebook_id, userEmail} = req.body;
    const notebook_id_int = Number(notebook_id); // Convert back to an int.
    console.log("title:", title, "content:", content, "notebook id:", notebook_id, "user email:", userEmail);

    try{
        // 1) Get the user.
        const user = await schemas.Users.findOne({email: userEmail});
        if (!user){
            return res.status(404).json({message: "Unable to find user under specified email - when saving quicknote."})
        }
        // 2) Get the notebook
        else{
            const notebook_to_update = user.notebooks.find(n => n.notebook_id === notebook_id_int);
            if (!notebook_to_update){
                return res.status(404).json({message: "Unable to find notebook when saving quicknote."})
            }

            // 3) Create a new note object
            const quickNote = {
                note_id: 100,
                title: title,
                content: content,
                note_date: new Date(),
                last_edited: new Date().toISOString()
            }

            // 4) Add the note to the notebook
            try{
                notebook_to_update.notes.push(quickNote);
            }
            catch(e){
                console.log("Unable to push quicknote to notes:", e)
            }

            // 5) Save
            await user.save();

        }
    }
    catch(e){
        return res.status(500).json({message: "Error when retrieving user data (saving quicknote):", e})
    }



    // 3) Add the note to the notebook.

    // 4) Save
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

const extractSprites = (sprites) => {
    return Object.fromEntries(
        Object.entries(sprites)
            .filter(([key, value]) => value !== null && typeof value === "string") // Ignore null and nested objects
    );
};

router.post("/searchPokeApi", async(req, res) => {
    try {
        const { query } = req.body; // Extract search query
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

        // 1) Query poke-api
        console.log("Fetching data from:", apiUrl);
        const response = await axios.get(apiUrl);

        // 2) Filter the response for the sprites
        const sprites = extractSprites(response.data.sprites)

        // 3) Send (sprite) data back to client
        res.json(200, sprites);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: "Pokémon not found" });
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

})
module.exports = router
