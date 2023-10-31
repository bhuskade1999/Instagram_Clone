const express = require('express');
const { addMessage, getMessages,deleteMessages } = require('../controllers/MessageController.js');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

// router.post('/', addMessage);

// router.get('/:chatId', getMessages);


router.route("/").post(addMessage)
router.route("/:chatId").get(getMessages)
router.route("/delete/:id").delete(deleteMessages)

module.exports = router