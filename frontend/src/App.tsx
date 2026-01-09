import Welcome from "../components/welcome";
import {Routes, Route } from "react-router"
import ChatRoom from "../components/room";
import { useState } from "react";

function App() {
  return (
    <>
     <div className="bg-[#e0dcdc] h-screen w-100wv flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/room" element={<ChatRoom />}></Route>
      </Routes>
     </div>
    </>
  )
}

export default App
