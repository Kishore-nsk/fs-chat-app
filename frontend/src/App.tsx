import Welcome from "../components/welcome";
import {Routes, Route } from "react-router"
import ChatRoom from "../components/room";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <>
     <div className="bg-black h-screen w-100wv flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Welcome onNameChange={(arg) => setName(arg)} />}></Route>
        <Route path="/room" element={<ChatRoom name={name} />}></Route>
      </Routes>
     </div>
    </>
  )
}

export default App
