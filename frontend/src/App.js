import React from 'react'
import "./App.css"
import Main from "./Main/Main"
import { useEffect, useState } from "react";

const App = () => {
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


  // return ratio > 2 ? (
  //   <>
  //     <Main />
  //   </>
  // ) :
  //   (
  //     <em id="customMessage"> Please Change the ratio to View!</em>
  //   );

  return (
    <div
       className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
    <Main />
    </div>

    // <>
    //  <Main />
    // </>
    
  )



}

export default App