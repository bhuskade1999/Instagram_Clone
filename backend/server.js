
const app = require("./app")
const cloudinary = require("cloudinary")
const { connectDatabase } = require("./imp/database")
const { connectSocketIo } = require("./imp/socketIo")


connectDatabase() //accessing database


connectSocketIo() //accessing socket io info


cloudinary.config({
    cloud_name :process.env.CLOUDINARY_NAME,
    api_key :process.env.CLOUDINARY_API_KEY,
    api_secret :process.env.CLOUDINARY_SECRET
})
 


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port : ${process.env.PORT}` )
})


