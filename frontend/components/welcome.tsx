import { useRef } from "react";
import { Link } from "react-router";

interface WelcomeProps {
    onNameChange: (arg: string) => void;
}

const Welcome = ({ onNameChange } : WelcomeProps) => {
    const nameRef = useRef<HTMLInputElement>(null);

    const joinRoom = () => {  
        nameRef.current ? onNameChange(nameRef.current.value) : onNameChange("");
    }

    return ( 
        <div className="h-[250px] w-[250px] border-1 border-solid border-white text-white flex flex-col justify-center items-center gap-[15px]">
            <h4>Enter your name:</h4>
            <input type="text" ref={nameRef} className="border-1 border-solid border-white ml-[10px] rounded-[10px] h-[32px] w-[190px] pl-[6px]" />
            <button className="border-1 border-solid border-white w-[50px] cursor-pointer rounded-[10px]" onClick={joinRoom}><Link to="/room">Join</Link> </button>
        </div>
    )
}

export default Welcome;