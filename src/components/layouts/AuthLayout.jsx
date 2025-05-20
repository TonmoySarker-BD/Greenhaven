import React from 'react';
import NavBar from '../common/NavBar';
import { Outlet } from 'react-router';
import Footer from '../common/Footer';

const AuthLayout = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main className='min-h-screen mx-10'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;