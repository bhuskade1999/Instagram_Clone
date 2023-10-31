
import React, { useState,useEffect} from 'react'
import "./Header.css"
import { Link } from "react-router-dom"

import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
 


 const Header = () => {

  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  
  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", resizeRatio);

    return () => {
      window.removeEventListener("resize", resizeRatio);
    };
  }, [ratio]);

  const [tab, setTab] =  useState(window.location.pathname)


  return (
    <div className='header-item'>
      <div className="header">

        <div className = { ratio > 2 ? "header-logo" : "header-icon" }></div>

        <div className='icon-box'>
          <Link to="/" onClick={() => setTab("/")}>
            {
              tab === "/" ? <Home style={{ color: "white" }} /> : <HomeOutlined />
            }
          </Link>
        </div>


        <div className='icon-box'>
          <Link to="/newPost" onClick={() => setTab("/newPost")} >
            {
              tab === "/newPost" ? <Add style={{ color:"white" }} /> : <AddOutlined />  
            } 
          </Link>
        </div>


        <div className='icon-box'>
          <Link to="search" onClick={() => setTab("/search")} >
            {
              tab === "/search" ? <Search style={{ color: "white" }} /> : <SearchOutlined />
            }
          </Link>
        </div>


        <div className='icon-box'>
          <Link to="account" onClick={() => setTab("/account")}>
            {
              tab === "/account" ? <AccountCircle style={{ color: "white" }} /> : <AccountCircleOutlined />
            }
          </Link>
        </div>


        <div className='icon-box'>
          <Link to="chat" onClick={() => setTab("/chat")}>
            {
              tab === "/chat" ? <ChatOutlinedIcon style={{ color: "white" }} /> : <ChatOutlinedIcon />
            }
          </Link>
        </div>

      </div>

    </div>
  )
}






const Header2 = () => {

  return (
    <div className='testing-item'>
      <div className="testing">
      </div>

    </div>
  )
}













export { Header, Header2 };











