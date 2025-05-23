import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FaLeaf, FaHome, FaSeedling } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import animation from '../../assets/Animation.json';
import Lottie from 'lottie-react';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Not Found | Green Heaven";
    }, []);
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 text-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Lottie Animation Section */}
                <div className="w-full flex justify-center">
                    <Lottie animationData={animation} loop autoplay className="w-full max-w-md lg:max-w-lg" />
                </div>

                {/* Text and Buttons Section */}
                <div className="w-full">
                    <Fade cascade duration={2000}>
                        <h1 className="text-4xl lg:text-5xl font-bold text-error mb-4">Page Not Found</h1>
                        <p className="text-lg lg:text-xl text-base-content mb-6">
                            Oops! The page you're looking for has been composted or hasn't grown yet.
                        </p>

                        <div className="text-8xl lg:text-9xl font-bold text-primary opacity-20 mb-4">404</div>
                    </Fade>

                    <div className="space-y-4 mb-8 text-left">
                        <div className="flex items-center bg-base-200 rounded-lg p-4">
                            <FaLeaf className="text-2xl text-primary mr-4" />
                            <div>
                                <h3 className="font-bold">Popular Pages</h3>
                                <p className="text-sm text-base-content/70">
                                    Explore our trending gardening tips and guides.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <Link to="/" className="btn btn-primary gap-2">
                            <FaHome /> Back to Home
                        </Link>
                        <Link to="/tips" className="btn btn-outline gap-2">
                            <FaSeedling /> Browse Tips
                        </Link>
                    </div>

                    <div className="mt-12 flex justify-start space-x-6 opacity-50">
                        <FaLeaf className="text-3xl text-primary animate-pulse" />
                        <FaLeaf className="text-3xl text-secondary animate-pulse delay-100" />
                        <FaLeaf className="text-3xl text-accent animate-pulse delay-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
