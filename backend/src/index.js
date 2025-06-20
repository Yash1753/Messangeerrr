import express from 'express';
import authRoutes from './routes/auth.router.js';
import messageRoutes from './routes/message.router.js';
import dotenv from 'dotenv';
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.js";
import path from "path";

dotenv.config();

const port = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist" ,"index.html"));
    })
}


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
    connectDB();
})