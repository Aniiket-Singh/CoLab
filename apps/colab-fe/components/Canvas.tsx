import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas ({roomId, socket} : {roomId:string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current){
            initDraw(canvasRef.current, roomId, socket)

        }
    }, [canvasRef]);

    return <div>
        <canvas ref={canvasRef} width = {2000} height = {1000}></canvas>
    {/* <div className="absolute bottom-0 right-0 flex flex-col gap-2 p-4">
        <button className="text-white">Rect</button>
        <button className="text-white">Circle</button>
    </div> */}
    </div>

}