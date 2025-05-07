import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { CircleIcon, PencilIcon, RectangleHorizontalIcon } from "lucide-react";

type Shape = "pencil" | "rect" | "circle";

export function Canvas ({roomId, socket} : {roomId:string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("pencil"); 
    
    useEffect(() => {
        //@ts-ignore
        window.selectedTool = selectedTool

    }, [selectedTool])
    
    useEffect(() => {
        if(!canvasRef.current || !socket)
            return

        const cleanup = initDraw(canvasRef.current, roomId, socket)
        return cleanup

    }, [canvasRef.current, socket, roomId]);

    //overflow-hidden hides scrollbars, clips extra content if it exists
    return <div className = "overflow-hidden"> 
        <canvas ref={canvasRef} width = {window.innerWidth} height = {window.innerHeight}></canvas>
        <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div> 
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void
}){
    return <div className="fixed flex top-4 left-1/2 transform -translate-x-1/2 gap-2">
        <IconButton onClick={()=> {setSelectedTool("pencil")}} activated={selectedTool == "pencil"} icon={<PencilIcon/>} />
        <IconButton onClick={()=> {setSelectedTool("rect")}} activated={selectedTool == "rect"} icon={<RectangleHorizontalIcon/>} />
        <IconButton onClick={()=> {setSelectedTool("circle")}} activated={selectedTool == "circle"} icon={<CircleIcon/>}  />
    </div>
}