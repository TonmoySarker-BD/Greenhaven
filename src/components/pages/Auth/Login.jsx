import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaLeaf, FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Provider/AuthProvider';

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn(email, password);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            toast.success('Signed in with Google!');
            navigate('/');
        } catch (error) {
            toast.error(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-disabled':
                return 'Account disabled';
            case 'auth/user-not-found':
                return 'No account found with this email';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/popup-closed-by-user':
                return 'Google sign-in was canceled';
            default:
                return 'Login failed. Please try again';
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <FaLeaf className="text-primary text-5xl mx-auto" />
                <h2 className="mt-6 text-3xl font-bold text-base-content">
                    Welcome  to Green Haven
                </h2>
                <p className="mt-2 text-sm text-base-content/80">
                    Continue your gardening journey
                </p>
            </div>

            <div className="p-8 shadow-lg bg-base-100 rounded-2xl mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="">
                    {/* Email/Password Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-base-content">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <FaUser className="absolute left-3 top-2.5 text-base-content/50" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-base-content">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <FaLock className="absolute left-3 top-2.5 text-base-content/50" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-base-content">
                                <input type="checkbox" className="checkbox checkbox-primary" />
                                Remember me
                            </label>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm font-medium text-primary hover:text-primary-focus"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-content/20" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-base-200 text-base-content/80">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="btn btn-outline w-full flex justify-center items-center gap-2"
                        >
                            <FcGoogle />
                            Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-base-content/80">
                        Don't have an account?{' '}
                        <Link to="/auth/Register" className="text-primary hover:text-primary-focus font-medium">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
