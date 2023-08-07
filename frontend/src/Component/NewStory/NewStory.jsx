import React, { useEffect, useState } from "react"
import "./NewStory.css"
import { useDispatch, useSelector } from "react-redux"
import { Button, Typography } from "@mui/material"
import { createNewStory } from "../../Actions/Post"
import { useAlert } from "react-alert";
import { loadUser } from "../../Actions/User"



const NewStory = () => {

  const { loading, error, message } = useSelector((state) => state.likes)
  const dispatch = useDispatch()
  const alert = useAlert()

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result)
      }
    }

  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(createNewStory(caption, image))
    dispatch(loadUser())
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert.success(message)
      dispatch({ type: "clearMessage" })
    }
  }, [dispatch, error, message, alert])


  return (
    <div className="newStory">
      <form className="newStoryForm" onSubmit={submitHandler}>

        <Typography variant="h3"> Add Story </Typography>

        {image && (
          <React.Fragment>
            {(() => {
              const fileType = image.split(';')[0].split('/')[0];
              if (fileType === "data:video") {
                return (
                  <video controls>
                    <source src={image} type="video/mp4" />
                        Your browser does not support the video tag.
                  </video>
                );
              } else {
                return (<img src={image} alt="story" />);
              }
            })()}
          </React.Fragment>
        )}

        <input type="file" accept="video/*,image/*" onChange={handleImageChange} />
        <input type="text" placeholder="caption..."
          value={caption} onChange={(e) => setCaption(e.target.value)} />

        <Button disabled={loading} type="submit" style={{fontSize:"1rem",
        marginTop:"15px", backgroundColor:"blue",borderRadius:"10px",
        color:"white",}}
         > Post </Button>

      </form>
    </div>
  )
}

export default NewStory