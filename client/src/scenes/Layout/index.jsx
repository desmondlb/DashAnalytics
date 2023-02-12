import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import { Outlet } from 'react-router-dom'; 
// Outlet allows use to have template layouts
import { useSelector } from 'react-redux';
import NavBar from "component/NavBar";
import Sidebar from "component/Sidebar";
import { useGetUserQuery } from 'state/api';


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    // gives a true or false boolean if the minimum width is achieved on the screen

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);
    // above grabs the information from redux toolkit in the index.js file where we have mentioned
    // the user
    const { data } = useGetUserQuery(userId);

    return (
        <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
            <Sidebar
                user = {data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                />
            <Box flexGrow={1}>
                <NavBar
                    user = {data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    />
                <Outlet/>
                {/* Outlet allows us to represent whatever component is underneath 
                including the dashboard component flexgrow will let it take up as much space as it can*/}
            </Box>
        </Box>
    )
};

export default Layout;