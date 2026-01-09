import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";

const Welcome = () => {
    const [name, setName] = useState("");
    const [roomNumber, setRoomNumber] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const joinRoom = () => {  
        localStorage.setItem("username", name);
        isChecked === false ? localStorage.setItem("roomNumber", String(Math.floor(Math.random() * 10000)).padStart(4, '0')) : localStorage.setItem("roomNumber", roomNumber);
        navigate("/room");
    }

    const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    }

    return ( 
        <div className="h-[325px] w-[325px] bg-white text-[#1d2129;] rounded-t-[8px] flex flex-col justify-center items-center gap-[20px]">
            <input placeholder="Enter your name:" type="text" value={name} onChange={(event) => setName(event.target.value)} className="pl-[8px] bg-white border-1 border-solid border-[#e0dcdc] rounded-[5px] ml-[10px] h-[40px] w-[250px]" />
            <div className="flex justify-center items-center gap-[5px]">
                <input type="checkbox" checked={isChecked} onChange={handleCheckBoxChange} />
                <label htmlFor="">Join with room number</label>
            </div>
            {isChecked ? (
                <input type="text" value={roomNumber} onChange={(event) => setRoomNumber(event.target.value)} placeholder="Enter room number:" className="pl-[8px] bg-white border-1 border-solid border-[#e0dcdc] rounded-[5px] ml-[10px] h-[40px] w-[250px]" />
            ) : null}
            <button disabled={name.length === 0 || (isChecked && roomNumber.length === 0)} className="w-[250px] h-[40px] cursor-pointer rounded-[5px] bg-[#0866ff] text-white transition duration-200 hover:bg-[#7aa9f5] border-0 disabled:bg-[#7aa9f5]" onClick={joinRoom}>Join</button>
        </div>
    )
}

export default Welcome;