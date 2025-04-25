import express  from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.post('/signup', async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    
    try {
        const user = await prismaClient.user.create({
            data: {
                username: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })

        res.json({
            userId: user.id
        })
    } catch (error) {
        res.status(411).json({
            message: "database call failed" 
        })
    }

})

app.post('/signin', async (req, res) => {
    
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            username: parsedData.data.username,
            password: parsedData.data.password,
        }
    })

    if(!user) {
        res.status(403).json({
            message: "user doesnt exist"
        })
        return;
    }

    const userId = user.id;
    const token = jwt.sign({
        userId,
    }, JWT_SECRET);
    res.json({
        token
    })
})

app.post('/room', middleware , async (req, res) => {

    const parsedDatadata = CreateRoomSchema.safeParse(req.body);
    if(!parsedDatadata.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;

try {
    const room = await prismaClient.room.create({
        data: {
            slug: parsedDatadata.data.name,
            adminId: userId
        }
    })

    res.json({
        roomId: room.id
    })
} catch (error) {
    res.status(411).json({
        message: "room not created"
    })
}
})

app.get('/chats/:roomId', async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        console.log(messages)
        res.json({messages})
    } catch (error) {
        res.json({messages: []})
        console.log("ERROR")
    }

})

app.get('/room/:slug', async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    })

    res.json({
        room
    })
})
app.listen(3001);
