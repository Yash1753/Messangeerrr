import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set,get)=>({
    authUser: null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    onlineUsers: [],
    isCheckAuth:true,
    socket:null,

    checkAuth : async()=>{
        try{
            const response = await axiosInstance.get("/auth/check");
            set({authUser : response.data})

            get().connectSocket()

        }catch(e){
            console.log("error in checkAuth", e.message)
            set({authUser : null})
        }finally{
            set({isCheckAuth:false})
        }
    },

    signup : async(data)=>{
        set({isSigningUp : true});
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser : res.data})
            toast.success("User signed up successfully")

            get().connectSocket()
        }catch(e){
            toast.error( e.response.data.message);
        }finally{
            set({isSigningUp : false})
        }
    },
    logout : async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser : null})
            toast.success("User logged out successfully")
            get().disconnectSocket()
        }catch(e){
            toast.error( e.response.data.message);

        }
    },
    login : async(data)=>{
        set({isLoggingIn : true})
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser : res.data})
            toast.success("User logged in successfully")

            get().connectSocket()
        }catch(e){
            toast.error( e.response.data.message);
        }finally{
            set({isLoggingIn : false})
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        console.log(data)
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },





}))