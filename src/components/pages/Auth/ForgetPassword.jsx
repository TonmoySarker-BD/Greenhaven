import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaLeaf, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Provider/AuthProvider';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-not-found':
                return 'No account found with this email';
            case 'auth/too-many-requests':
                return 'Too many attempts. Try again later';
            default:
                return 'Failed to send reset email';
        }
    };

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            await resetPassword(email);
            setMessage('Password reset email sent. Please check your inbox.');
            toast.success('Password reset email sent');
            setTimeout(() => {
                window.open('https://mail.google.com', '_blank');
                navigate('/auth/login');
            }, 3000);
        } catch (error) {
            const msg = getErrorMessage(error.code);
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <FaLeaf className="text-primary text-5xl" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-base-content">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-base-content/80">
                    We'll send you a link to reset your password
                </p>
            </div>

            <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-md">
                <div className="bg-base-200 rounded-2xl py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="mb-6">
                        <Link
                            to="/auth/login"
                            className="text-sm text-primary hover:text-primary-focus flex items-center"
                        >
                            <FaArrowLeft className="mr-1" /> Back to login
                        </Link>
                    </div>



                    <form className="space-y-6" onSubmit={handleForgetPassword}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-base-content">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-base-content" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="mb-4 p-4 bg-success/10 text-success rounded-lg">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-4 bg-error/10 text-error rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-base-content/80">
                            Don’t have an account?{' '}
                            <Link to="/auth/Register" className="font-medium text-primary hover:text-primary-focus">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
