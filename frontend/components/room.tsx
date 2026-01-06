import { useEffect, useRef, useState } from "react";

interface NameProps {
    name: string;
}

interface Message {
    name: string;
    message: string;
}

const ChatRoom = ({name} : NameProps) => {
    const connection = useRef<WebSocket>(null);
    const [inputMessage, setInputeMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, JSON.parse(event.data)]);
        } 

        connection.current = ws;

        return () => {
            //@ts-ignore
            connection.current.close();
        }
    }, []);

    const sendMessage = () => {
        if(inputMessage && connection.current) {
            const message = inputMessage;
            connection.current.send(JSON.stringify({name: name, message: message}));
            setInputeMessage("");
        }

    }

    const messageItems = messages.map(message => {
        return <DisplayMessage name={message.name} message={message.message} />
    })

    return ( 
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-black">
            <div className="h-[700px] w-[700px] border-1 border-solid border-white text-white">
                <div className="h-[630px] w-[100%]">
                    {messageItems}
                </div>
                <div className="h-[70px] w-[100%] border-t-1 boreder-solid border-white flex justify-between items-center">
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                    }}>
                        <input onChange={e => setInputeMessage(e.target.value)} value={inputMessage} type="text" placeholder="Type a message" className="ml-[10px] border-1 border-solid border-white rounded-[10px] h-[40px] pl-[5px] w-[300px]" />
                    </form>
                    <button onClick={sendMessage} className="border-1 boreder-solid border-white rounded-[20px] mr-[10px] w-[60px] h-[40px] cursor-pointer">Send</button>
                </div>
            </div>
        </div>
    )
}

const DisplayMessage = ({name, message}: Message) => {
    return (
        <p>{`${name}: ${message}`}</p>
    )
}

export default ChatRoom;