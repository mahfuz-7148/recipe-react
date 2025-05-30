import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const { googleAuth, loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await loginUser(email, password);
            toast.success('Logged in successfully!', { autoClose: 2000 });
            navigate('/');
        } catch (error) {

            toast.error(error.message || 'Invalid email or password', { autoClose: 2000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {

        setLoading(true);
        try {
            await googleAuth();
            toast.success('Logged in with Google successfully!', { autoClose: 2000 });
            navigate('/');
        } catch (error) {

            toast.error(error.message || 'Google login failed', { autoClose: 2000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">
                        Log in to your account
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Welcome back! Sign in to continue.
                    </p>
                </div>

                <form onSubmit={formLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full mt-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full mt-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                id="remember-me-checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                            />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105 ${
                            loading
                                ? 'bg-indigo-400 dark:bg-indigo-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                        }`}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div className="flex items-center justify-between">
                    <span className="w-1/5 border-b border-gray-300 dark:border-gray-600"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            or login with
          </span>
                    <span className="w-1/5 border-b border-gray-300 dark:border-gray-600"></span>
                </div>
                <button
                    onClick={googleLogin}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200 ${
                        loading
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_17_40)">
                            <path
                                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                fill="#34A853"
                            />
                            <path
                                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                fill="#FBBC04"
                            />
                            <path
                                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                fill="#EA4335"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {loading ? 'Processing...' : 'Continue with Google'}
                </button>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;