
import React, { useState} from 'react'
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
import { Typography } from '@mui/material';





const Header = () => {

  const [tab, setTab] =  useState(window.location.pathname)



  return (
    <div className='header-item'>
      <div className="header">
        <div className="header-logo"></div>

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



      </div>

    </div>
  )
}

export default Header