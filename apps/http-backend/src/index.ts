import express from "express";
import { Request, Response } from "express";

import { middleware } from "./middleware";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", (req: Request, res: Response) => {
    res.json({roomID: 123})
})

app.post("/api/v1/signin", (req: Request, res: Response) => {
    const userID = 123;
    const token = jwt.sign({
        userID
    }, JWT_SECRET);
})

app.post("/api/v1/room", middleware,  async (req: Request, res: Response) => {
    res.json({roomID: 123})
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});