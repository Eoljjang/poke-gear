const express = require('express')
const router = express.Router()
router.get('/users', (req, res) => {
    const dummyData = [
        {
            user_id: 1,
            notebook_name: "some name",
        }
    ]
    res.send(dummyData)
})

module.exports = router
