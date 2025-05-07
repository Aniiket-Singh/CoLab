import axios from "axios"
import { BACKEND_URL } from "@/config";

type Shape = {
    type: 'rect',
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: 'circle',
    centerX: number,
    centerY: number,
    radius: number
} 

export function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  let existingShapes: Shape[] = [];
  let clicked = false;
  let startX = 0;
  let startY = 0;

  (async () => {
    existingShapes = await getExistingShapes(roomId);
    clearCanvas(existingShapes, canvas, ctx);
  })();

  const onMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };
  socket.addEventListener("message", onMessage);

  const onMouseDown = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!clicked) return;
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    //@ts-ignore
    const selectedTool = window.selectedTool;
    let shape: Shape | null;
    if(selectedTool === "rect"){
      shape = {
        type: selectedTool,
        x: startX,
        y: startY,
        height,
        width
      };
    }
    else if(selectedTool === "circle"){
      const centerX = startX + width/2;
      const centerY = startY + height/2;
      const radius = Math.sqrt(width**2 + height**2)/2;
      shape = {
        type: selectedTool,
        centerX,
        centerY,
        radius,
      };
    }
    else{
      return;
    }

    socket.send(JSON.stringify({
      type: "chat",
      roomId: Number(roomId),
      message: JSON.stringify(shape)
    }));
  };

  const onMouseMove = (e: MouseEvent) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      //@ts-ignore
      const selectedTool = window.selectedTool;
      if(selectedTool == "rect")
        ctx.strokeRect(startX, startY, width, height);
      else if(selectedTool === "circle"){
        const centerX = startX + width/2;
        const centerY = startY + height/2;
        const radius = Math.sqrt(width**2 + height**2)/2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();       
      }
    }
  };

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);

  return () => {
    socket.removeEventListener("message", onMessage);
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
  };
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)"; //paint canvas bg black
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255, 255, 255)"; //paint strokes white

  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
    else if(shape.type === "circle"){
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();  
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  const messages = res.data.messages;

  return messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });
}
