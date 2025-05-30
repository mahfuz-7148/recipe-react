import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.jpg';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { NavLink, useNavigate } from 'react-router';
import { ThemeContext } from '../Contexts/ThemeContext.jsx';
import { toast } from 'react-toastify';

export default function Navbar() {
    const { signOutUser, saveUser, loading } = useContext(AuthContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const navigation = [
        { name: 'Home', to: '/', current: false },
        { name: 'All Recipes', to: '/recipes', current: false },
        ...(saveUser
            ? [
                { name: 'My Recipes', to: '/myRecipes', current: false },
                { name: 'Add Recipe', to: '/addRecipe', current: false },
            ]
            : [
                { name: 'Login', to: '/login', current: false },
                { name: 'Register', to: '/register', current: false },
            ]),
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        toast.info(`Switched to ${newTheme} mode`, { autoClose: 2000 });
    }

    const clickSignOut = () => {
        const toastId = 'signout-toast';
        if (toast.isActive(toastId)) return; // Prevent duplicate toasts

        signOutUser()
            .then(() => {
                toast.success('Signed out successfully!', { toastId, autoClose: 2000 });
                navigate('/login');
            })
            .catch((error) => {
                console.error('Sign out error:', error);
                toast.error(`Sign out failed: ${error.message}`, { toastId, autoClose: 2000 });
            });
    };

    return (
        <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white focus:ring-2 focus:ring-white dark:focus:ring-gray-300 focus:outline-none focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img alt="Recipe App" src={logo} className="h-10 w-auto rounded-full" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        to={item.to}
                                        key={item.name}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive ? 'bg-gray-900 dark:bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                                            )
                                        }
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            onClick={toggleTheme}
                            className="text-gray-300 dark:text-gray-100 p-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-8 cursor-pointer"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-8 cursor-pointer"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                    />
                                </svg>
                            )}
                        </button>
                        {loading ? (
                            <div className="ml-3 flex items-center">
                                <svg
                                    className="animate-spin h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                                    ></path>
                                </svg>
                            </div>
                        ) : (
                            saveUser?.email && (
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-white dark:focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-950 focus:outline-none">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt={saveUser?.displayName || 'User'}
                                                src={saveUser?.photoURL || ''}
                                                className="size-8 rounded-full"
                                                onError={(e) => (e.target.src = '')}
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                                                {saveUser?.displayName || 'User'}
                                            </div>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={clickSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700 data-[focus]:outline-none"
                                            >
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            )
                        )}
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={NavLink}
                            to={item.to}
                            className={({ isActive }) =>
                                classNames(
                                    isActive ? 'bg-gray-900 dark:bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )
                            }
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}