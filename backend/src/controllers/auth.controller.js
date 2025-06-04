import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        //hash passwords using bcrypt
        if(password.length < 6){
            return res.status(400).send({error: 'Password must be at least 6 characters'});
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).send({error: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({   ///this is not getting savwed in Mongo but the _id is generated here
            fullName,
            email,
            password : hash,
        })

        if (newUser) {
            //generate jwt token
            const token = generateToken(newUser._id, res) // cookie m jwt set kr diya
            await newUser.save()  //here the newUser created is stored in  mongoDB

            res.status(201).json({
                token,
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })

        }else{
            res.status(400).send({error: 'Invalid userData'});
        }

    }catch(err){
        console.log("Error in signup",err);
        res.status(500).send({error: 'Something went wrong'});
    }
}

export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).send({error: 'Invalid Credentials'});
        }

        const IsPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!IsPasswordCorrect){
            return res.status(400).send({error: 'Invalid Credentials'});
        }

        const token = generateToken(user._id,res)

        return res.status(201).json({
            token,
            _id : user._id,
            email
        })
    }catch(e){
        console.log("Error in login",e.message);
    }
}

export const logout = (req, res) => {
    //clear cookies
    try{
        res.cookie("jwt" , "" , {
            maxAge: 0
        })
        res.status(200).json({
            msg : "Logged out successfully",
        })
    }catch(e){
        console.log("Error in logout",e.message);
        res.status(500).send({error: 'Something went wrong'});
    }


}

export const updateProfile = async (req, res) => {
    try{
        const {profilePicture} = req.body;
        const userID = req.user._id //jo mera protect route h usse authenticated user is coming {its id is coming}
        if(!profilePicture){
            res.status(400).send({error: 'Profile picture does not exist'});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate(userID, {
            profilePicture: uploadResponse.secure_url,
        },{
            new: true  //its significvance -> shows the updated result immediate as by default update return object as it was before update
        })

        res.status(200).json(updatedUser);
    }catch(e){
        console.log("Error in updateProfile",e.message);
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};