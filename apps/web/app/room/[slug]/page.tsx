import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId (slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)

    if(!response.data.room){
        return <div>Room {slug} not found</div>
    }

    return response.data.room.id;
}

interface PageParams {
    params: {slug: string},

}

export default async function chatRoom( {params}: PageParams) {
    const slug = (await params).slug //params returns a promise
    const roomId = await getRoomId(slug);

    return <ChatRoom id = {roomId}/>
}