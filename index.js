import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { dbConn } from "./dbconfig.js";
import User from "./userSchema.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Server is working fine");
});

app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    const data = await User.create({ name, email });
    return res.status(200).json(data);
});

app.get("/getUser", async (req, res) => {
    const data = await User.find().select("-__v");
    return res.status(200).json({ message: "Successfully fetched data", data });
});

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connect", (socket) => {
    console.log("User connected socketId:", socket.id);

    socket.on("message", (data) => {
        socket.emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected socketId: ${socket.id}`);
    });
});

server.listen(4000, async () => {
    await dbConn();
    console.log(`Server is running inside container on port 4000`);
});