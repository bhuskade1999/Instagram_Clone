const User =require("../model/user");
const Story = require("../model/story")
const cloudinary = require("cloudinary")


exports.createStory = async (req,res)=>{
try{
    const mycloud = await cloudinary.v2.uploader.upload(req.body.image,{
            resource_type: "auto",
            folder: "Story",
            chunk_size: 6000000,
            folder:"posts"
    })

const newStoryData ={
    caption : req.body.caption,
    image:{
        public_Id : mycloud.public_id,
        url : mycloud.secure_url
    },
    owner :req.user._id
}

const story = await Story.create(newStoryData)

let storyId = story._id.toString()
let userId = req.user._id.toString()

const user = await User.findById(userId)

user.story.unshift(storyId)
await user.save()

schedulePostDeletion(storyId, userId)

return res.status(200).json({success:true,message:"Story Uploaded and its valid for next 24 hour "})


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message })
}

}

//====================== delete story automatically ==================================



  
  const deletePostAndRemoveFromUser = async (storyId, userId) => {
    try {
      const story = await Story.findById(storyId);
      await cloudinary.v2.uploader.destroy(story.image.public_Id)
      await story.deleteOne();
      const user = await User.findById(userId);
      user.story = user.story.filter((id) => id.toString() !== storyId.toString());
      await user.save();
      console.log('Post deleted successfully');
    } catch (err) {
      console.error('Error while deleting post:', err);
    }
  };
  
  // Function to schedule post deletion after 30 minutes
  const schedulePostDeletion = (storyId, userId) => {
    setTimeout(() => {
      deletePostAndRemoveFromUser(storyId, userId);
    }, 30 * 60 * 1000); // 30 minutes (30 * 60 * 1000 milliseconds)
  };



  //======================== Stories Of Following ======================================

  exports.getStoryOfFollowing = async (req,res) =>{
    try{
     
    const user = await User.findById(req.user._id) 
     
    const story = await Story.find({owner:{$in:user.following}}).populate("owner")
    
    res.status(200).json({success:true, story:story.reverse()})
    
    
    }catch(err){
        res.status(500).json({
        success:false,
        message :err.message  })
    }
         
    }
    


    //========================= Delete Story Manually ===========================


    exports.deleteStory = async (req,res) => {
      try {
        const story = await Story.findById(req.params.id);
        let userId = story.owner
        await cloudinary.v2.uploader.destroy(story.image.public_Id)
        await story.deleteOne();
        const user = await User.findById(userId);
        user.story = user.story.filter((id) => id.toString() !== req.params.id.toString());
        await user.save();
        return res.status(200).json({ success: true, message: "Story Deleted Successfully" })

      } catch (err) {
        console.error('Error while deleting Story:', err);
      }
    };



    //=================================  Story Views ==========================


    
    exports.storyViews = async (req,res) => {
      try {
        const story = await Story.findById(req.params.id);

        if(story.views.includes(req.user._id)){
          console.log("Story already viewed Successfully")
          return res.status(200).json({ success: true, message: "Story already viewed Successfully" })
        }

        if(req.user._id.toString() == story.owner.toString()){
          console.log("owner of Story")
          return res.status(200).json({ success: true, message: "Story already viewed Successfully" })
        }

        story.views.unshift(req.user._id)
        await story.save()

        console.log("Story Viewed")
        return res.status(200).json({ success: true, message: "Story viewed Successfully" })

       } catch (err) {
        console.error('Error while deleting Story:', err);
      }
    };

    //=======================================Getting My story ===================

    exports.getMyStory = async (req, res) => {
      try {
        const user = await User.findById(req.user._id)
        const story = []
    
        for (let i = 0; i < user.story.length; i++) {
          const stories = await Story.findById(user.story[i]).populate("owner views")
          story.push(stories)
        }
    
    
        res.status(200).json({ success: true, story })
    
      } catch (err) {
        res.status(500).send({ success: false, message: err.message });
      }
    
    }