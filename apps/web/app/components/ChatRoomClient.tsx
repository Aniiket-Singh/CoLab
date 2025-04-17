"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"

interface RenderProps {
    messages: {message: string}[],
    id: string
}

export function ChatRoomClient ({messages,id}: RenderProps){
    const [chats, setChats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");
    const {socket, loading} = useSocket();

    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type: "join_room",
                roomId:id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat"){
                    setChats(c => [...c, {message: parsedData.message}])
                }
            }
        }
    }, [socket, loading, id])

    return <div>
        {chats?.map(m=> <div>{m.message}</div>)}

        <input type="text" value = {currentMessage} onChange = {e => {setCurrentMessage(e.target.value)}}></input>

        <button onClick={() => {
            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }))

            setCurrentMessage("");
        }}> Send Message</button>
    </div>
}