// Root.jsx
import React, {useContext} from 'react';
import Navbar from '../Components/Navbar.jsx';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer.jsx';
import {ThemeContext} from '../Contexts/ThemeContext.jsx';


const Root = () => {
    const { theme } = useContext(ThemeContext);
    return (

            <div className="bg-gray-300 dark:bg-gray-800 w-full min-h-screen" data-theme={theme || 'light'}>
                <nav className='sticky top-0 z-50'>
                    <Navbar />
                </nav>

                    <Outlet />

                <Footer />
            </div>

    );
};

export default Root;