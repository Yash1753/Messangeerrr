import React, {useEffect} from "react";
import "./App.css"
import Navbar from "./components/Navbar.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import {useThemeStore} from "./store/useThemeStore.js";



function App() {
    const {authUser,checkAuth, isCheckAuth, onlineUsers} = useAuthStore()
    const {theme} =   useThemeStore()
    console.log(onlineUsers)
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log(authUser);

    if(isCheckAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin "/>
            </div>
        )
    }


  return (
    <div data-theme={theme}>
        <Navbar />
       <Routes>
       <Route  path = "/" element={authUser ? <HomePage/> : <Navigate to = "/login" /> } />
       <Route  path = "/signup" element={!authUser ? <SignUpPage/> : <Navigate to = "/" /> } />
       <Route  path = "/login" element={!authUser ? <LoginPage/> : <Navigate to = "/" /> } />
       <Route  path = "/settings" element={<SettingsPage/>} />
       <Route  path = "/profile" element={authUser ? <ProfilePage/> : <Navigate to = "/login" />} />
       </Routes>

        <Toaster/>
    </div>
  )
}

export default App
