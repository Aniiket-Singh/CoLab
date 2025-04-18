import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=> {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNTFlMzA4My03YzFhLTQzZTUtOTk3ZS0wODM3OWE2MTRmMjAiLCJpYXQiOjE3NDQ5MTQ1Nzd9.aMYX71Phuu_ijigleAuos-Bx3AVwTEB5lg14FEHCEK8`);
        setSocket(ws)        
        
        ws.onopen = () => {
            console.log("WebSocket connected");
            setLoading(false);
        }

        ws.onclose = () => {
            console.log("Websocket closed");
        }

        ws.onerror = (err)=> {
            console.error("Websocket error: ", err);
        }

        return () => {
            ws.close();
        }
    }, [])

    return {
        socket,
        loading
    }
}