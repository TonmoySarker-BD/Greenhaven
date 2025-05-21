import React from 'react';
import { Link } from 'react-router';
import { FaLeaf, FaHome, FaSearch, FaSeedling } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full">
                {/* Animated 404 Illustration */}
                <div className="flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-error">Page Not Found</h1>
                            <FaSeedling className="text-6xl mt-10 text-error mx-auto mb-4 animate-bounce" />
                        </div>
                    </div>
                <div className="relative mb-8">
                    <div className="text-9xl font-bold text-primary opacity-20">404</div>
                </div>

                <p className="text-xl text-base-content mb-8">
                    Oops! The page you're looking for has been composted or hasn't grown yet.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center bg-base-200 rounded-lg p-4">
                        <FaSearch className="text-2xl text-primary mr-4" />
                        <div className="text-left">
                            <h3 className="font-bold">Search Tips</h3>
                            <p className="text-sm text-base-content/70">
                                Try using different keywords or check your spelling
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center bg-base-200 rounded-lg p-4">
                        <FaLeaf className="text-2xl text-primary mr-4" />
                        <div className="text-left">
                            <h3 className="font-bold">Popular Pages</h3>
                            <p className="text-sm text-base-content/70">
                                Explore our trending gardening tips and guides
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="btn btn-primary gap-2">
                        <FaHome /> Back to Home
                    </Link>
                    <Link to="/tips" className="btn btn-outline gap-2">
                        <FaSeedling /> Browse Tips
                    </Link>
                </div>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center space-x-8 opacity-50">
                    <FaLeaf className="text-4xl text-primary animate-pulse" />
                    <FaLeaf className="text-4xl text-secondary animate-pulse delay-100" />
                    <FaLeaf className="text-4xl text-accent animate-pulse delay-200" />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;