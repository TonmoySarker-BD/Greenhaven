import React, { useEffect } from 'react';
import NavBar from '../common/NavBar';
import { Outlet } from 'react-router';
import Footer from '../common/Footer';

const HomeLayout = () => {
    useEffect(() => {
        document.title = "Home | Green Heaven";
    }, []);
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main className='min-h-[80vh]'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
            
        </div>
    );
};

export default HomeLayout;