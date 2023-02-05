import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import { Outlet } from 'react-router-dom'; 
// Outlet allows use to have template layouts
import { useSelector } from 'react-redux';
import NavBar from "component/NavBar";
import Sidebar from "component/Sidebar";


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    // gives a true or false boolean if the minimum width is achieved on the screen

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                />
            <Box>
                <NavBar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    />
                <Outlet/>
                {/* Outlet allows us to represent whatever component is underneath 
                including the dashboard component*/}
            </Box>
        </Box>
    )
};

export default Layout;