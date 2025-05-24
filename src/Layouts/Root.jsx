// Root.jsx
import React, {useContext} from 'react';
import Navbar from '../Components/Navbar.jsx';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer.jsx';
import {ThemeContext} from '../Contexts/ThemeContext.jsx';


const Root = () => {
    const { theme } = useContext(ThemeContext);
    return (

            <div className=" bg-gray-200 dark:bg-gray-800 w-full h-screen" data-theme={theme || 'light'}>
                <Navbar />

                    <Outlet />

                <Footer />
            </div>

    );
};

export default Root;