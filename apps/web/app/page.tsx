"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className=" bg-gray-500">
        <input className="p-10" value = {roomId} onChange={(e) => {
          setRoomId(e.target.value)
        }} type = "text" placeholder="Room id"></input>

        <button className="p-10" onClick={()=>{router.push(`/room/${roomId}`)}}>Join Room</button>
      </div>
    </div>
  );
}
