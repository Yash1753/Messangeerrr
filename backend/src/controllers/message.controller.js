import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersforSidebar = async (req, res) => {
    try{
        const loggedIn = req.user._id;
        const filteredUsers = await User.find({_id: {$ne : loggedIn}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(err){
        console.log("Error getting users for sidebar");
        res.status(500).json({
            error: "internal server error",
        })
    }
}

export const getMessages = async (req, res) => {
    try{
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or : [
                {senderId:myId, receiverId:userToChatId},
                {senderId: userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    }catch(err){
        console.log("Error getting messages for sidebar", err.message);
        res.status(500).json({
            error: "internal server error",
        })
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text,image} = req.body;
        const {id: receiverId} = req.params;
        const senderId=req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId:senderId,
            receiverId:receiverId,
            text:text,
            image : imageUrl,
        })

        await newMessage.save();


        //Real time functionality -> socket.io

        res.status(201).json(newMessage);


    }catch(err){
        console.log("Error sending message", err.message);
        res.status(500).json({
            error: "internal server error -> send Message",
        })
    }
}