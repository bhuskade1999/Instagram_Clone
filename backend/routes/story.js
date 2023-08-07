const express = require('express');
const { createStory,getStoryOfFollowing,deleteStory} = require('../controllers/story');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router() 

router.route("/story/upload").post( isAuthenticated,createStory)

router.route("/stories").get( isAuthenticated,getStoryOfFollowing )


router.route("/story/deleteStory/:id").delete( isAuthenticated,deleteStory)



module.exports = router