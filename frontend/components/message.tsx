import { Message } from "./room";

//bg-[#0866ff] 

const DisplayMessage = ({username, message}: Message) => {
    return (
        <div className="min-h-[30px] min-w-[50px] text-black font-bold">
            {
                !username ? (
                    null
                ) : (
                    <h4>{`${username}`}</h4>
                )
            }
            {
                !message ? (
                    null
                ) : (
                    <p className="font-light">{`${message}`}</p>
                )
            }
        </div>
    )
}

export default DisplayMessage;