import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import DisplayMessage from "./message";
import DisplayRoomNumber from "./room_number";

export interface Message {
    username: string;
    message: string;
}

const ChatRoom = () => {
    const connection = useRef<WebSocket>(null); //to store the websocket
    const name = useRef<string | null>(""); //to store the username
    const roomNumber = useRef<string | null>(""); // to store the room number 
    const [inputMessage, setInputeMessage] = useState<string>(""); // to store the message typed by the user 
    const [messages, setMessages] = useState<Message[]>([]); // to display the messages received from the connection
    const chatRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        name.current = localStorage.getItem("username");
        roomNumber.current = localStorage.getItem("roomNumber");
        if (!name.current) {
            navigate("/");
        }
        connection.current = new WebSocket("wss://fs-chat-app-abbj.onrender.com");

        connection.current.onopen = () => {
            if (connection.current) {
                connection.current.send(JSON.stringify({"type": "join","username": name.current, "roomNumber": roomNumber.current}))
            }
        }

        connection.current.onmessage = (event) => {
            setMessages((prev) => [...prev, JSON.parse(event.data)]);
        } 

        connection.current.onclose = () => {
            localStorage.clear();
        }

        return () => {
            if (connection.current && connection.current.readyState === WebSocket.OPEN) {
                connection.current.close();
            }
        }
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    },[messages]);

    const sendMessage = () => {
        if(inputMessage && connection.current) {
            const message = inputMessage;
            connection.current.send(JSON.stringify({type: "message", username: name.current, message: message}));
            setInputeMessage("");
        }

    }

    const messageItems = messages.map(message => {
        return <DisplayMessage key={messages.indexOf(message)} username={message.username} message={message.message} />
    })

    return ( 
        <div className="h-[100vh] w-[100vw] flex justify-center items-center gap-[50px] bg-[#e0dcdc] font-thin">
            <div className="h-[700px] w-[700px] bg-white text-black rounded-t-[8px]">
                <div ref={chatRef} className="h-[630px] w-[100%] pl-[5px] overflow-y-scroll">
                    {messageItems}
                </div>
                <div className="h-[70px] w-[100%] flex justify-between items-center">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                    }}>
                        <input onChange={e => setInputeMessage(e.target.value)} value={inputMessage} type="text" placeholder="Type a message" className="ml-[10px] h-[40px] pl-[7px] w-[620px] bg-[#e0dcdc] rounded-[30px] focus:outline-none text-black" />
                    </form>
                    <button onClick={sendMessage} className="mr-[10px] w-[50px] h-[50px] rounded-[50%] bg-[#e0dcdc] cursor-pointer transition duration-200 ease-in-out hover:bg-[#0866ff] hover:text-white">Send</button>
                </div>
            </div>
            <DisplayRoomNumber  roomNumber={Number(roomNumber.current)} />
        </div>
    )
}


export default ChatRoom;


