const express = require('express');
const { createStory,getStoryOfFollowing,deleteStory,storyViews,getMyStory} = require('../controllers/story');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router() 

router.route("/story/upload").post( isAuthenticated,createStory)

router.route("/stories").get( isAuthenticated,getStoryOfFollowing )


router.route("/story/deleteStory/:id").delete( isAuthenticated,deleteStory)

router.route("/story/storyView/:id").post( isAuthenticated,storyViews)


router.route("/story/getMyStory").get( isAuthenticated,getMyStory)



module.exports = router