const express = require('express');
const { createChat, findChat, userChats, getUser }= require('../controllers/ChatController.js');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router()

// router.post('/', createChat);
// router.get('/:userId', userChats);
// router.get('/find/:firstId/:secondId', findChat);


router.route("/").post(createChat)
router.route("/:userId").get(userChats)
router.route("/find/:firstId/:secondId").get(findChat)
router.route("/getuser/:id").get(getUser)
module.exports = router