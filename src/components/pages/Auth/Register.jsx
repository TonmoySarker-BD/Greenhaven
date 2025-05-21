import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaLeaf } from 'react-icons/fa';

const Register = () => {
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { createUser, setUser, updateUser, signInWithGoogle } = useContext(AuthContext);

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/email-already-in-use':
                return 'An account already exists with this email.';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/weak-password':
                return 'Weak password, must meet requirements';
            default:
                return 'Registration failed. Please try again.';
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setNameError('');
        setPasswordError('');
        setIsLoading(true);

        const { name, email, photoURL, password } = e.target.elements;
        const trimmedName = name.value.trim();
        const trimmedEmail = email.value.trim();
        const trimmedPhoto = photoURL.value.trim();

        if (trimmedName.length < 3) {
            setNameError('Name should be more than 3 characters');
            setIsLoading(false);
            return;
        }

        if (!validatePassword(password.value)) {
            setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, and a special character.');
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUser(trimmedEmail, password.value);
            const user = userCredential.user;

            await updateUser({ displayName: trimmedName, photoURL: trimmedPhoto });
            setUser({ ...user, displayName: trimmedName, photoURL: trimmedPhoto });

            await Swal.fire({
                icon: 'success',
                title: 'Account created successfully!',
                showConfirmButton: false,
                timer: 2000
            });

            navigate(`${location.state ? location.state : "/"}`);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: getErrorMessage(err.code),
                confirmButtonColor: '#d33'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            await Swal.fire({
                icon: 'success',
                title: 'Signed in with Google successfully !',
                showConfirmButton: false,
                timer: 2000
            });
            navigate(`${location.state ? location.state : "/"}`);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-in Failed',
                text: getErrorMessage(error.code),
                confirmButtonColor: '#d33'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <FaLeaf className="text-primary text-5xl mx-auto" />
                <h2 className="mt-6 text-3xl font-bold text-base-content">
                    Welcome back to GreenHaven
                </h2>
                <p className="mt-2 text-sm text-base-content/80">
                    Continue your gardening journey
                </p>
            </div>

            <div className="p-8 shadow-lg bg-base-300 rounded-2xl mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
                    {nameError && <p className="text-error text-sm">{nameError}</p>}

                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />

                    <input type="text" name="photoURL" placeholder="Photo URL (optional)" className="input input-bordered w-full" />

                    <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                    {passwordError && <p className="text-error text-sm">{passwordError}</p>}
                    {error && <p className="text-error text-sm">{error}</p>}

                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full"
                    disabled={isLoading}
                >
                    <FcGoogle className="mr-2" /> Continue with Google
                </button>

                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/auth" className="text-primary font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
