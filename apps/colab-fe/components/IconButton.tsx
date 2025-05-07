import { ReactNode } from "react";

type Shape = "pencil" | "rect" | "circle";

export function IconButton({
    icon, onClick, activated
}: {
    icon:ReactNode,
    onClick: () => void,
    activated: boolean 
}){
    return <div className={`pointer rounded-2xl border p-2 bg-black hover:bg-gray-700 ${activated ? "text-red-300" : "text-gray-300"} `} onClick={onClick}>
        {icon}
    </div>
}