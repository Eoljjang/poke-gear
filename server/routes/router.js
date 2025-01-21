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

module.exports = router
