// This is where we access the schemas.
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas');
const { useInRouterContext } = require('react-router-dom');
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

router.get("/", async (req, res) => {
    res.send("Hello world!")
})

router.post("/getUserData", async (req, res) => {
    const {userEmail} = req.body;
    console.log(userEmail);
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

router.put('/updateNote', async(req, res) => {
    const {noteContent, userEmail, notebook_id, note_id} = req.body

    // Mongo has these fields as int. They come as strings so we have to convert them.
    const notebook_id_int = Number(notebook_id);
    const note_id_int = Number(note_id);

    try {

        // 1) Get the current user
        const user = await schemas.Users.findOne({email: userEmail});
   
        if (!user){
            return res.status(404).json({message: "Email could not be found when updating note."})
        }
        // 2) Get the notebook
        const notebook = user.notebooks.find(nb => nb.notebook_id === notebook_id_int);
        if (!notebook){
            return res.status(404).json({message: "Notebook could not be found when updating note."});
        }

        // 3) Get the note
        const note = notebook.notes.find(n => n.note_id === note_id_int); // issue here
        if (!note){
            return res.status(404).json({message: "Note could not be found when updating note."});
        }
        
        // 4) Update the note content
        note.content = noteContent;

        // 5) Save user with updated content.
        await user.save();
        return res.status(200).json({message: "Successfully updated note content."})

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Sever error when trying to update note."})
    }
})

module.exports = router
