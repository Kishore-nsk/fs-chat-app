interface RoomNumberProps {
    roomNumber: number;
}

const DisplayRoomNumber = ({roomNumber}: RoomNumberProps ) => {
    return (
        <div className="h-[150px] w-[150px] bg-white text-black rounded-t-[8px] flex flex-col justify-center items-center font-bold">
            <h4>Room:</h4>
            <p>{roomNumber}</p>
        </div>
    )
}

export default DisplayRoomNumber;