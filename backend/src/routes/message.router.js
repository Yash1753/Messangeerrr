import express from "express";
import {protectRoute} from "../middleware/protectRoute.js";
import {getUsersforSidebar, getMessages, sendMessage} from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users", protectRoute, getUsersforSidebar); //show all users except the host
router.get("/:id", protectRoute, getMessages); //get messages between host and this id person

router.post("/send/:id", protectRoute, sendMessage);



export default router;