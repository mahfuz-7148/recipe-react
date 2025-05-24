import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2 text-white dark:text-gray-100">RECIPE BOOK</h3>
                    <p className="text-gray-400 dark:text-gray-300">© {new Date().getFullYear()} RECIPE BOOK. All rights reserved.</p>
                </div>
                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum itaque neque.
                </p>
                <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                    {['Facebook', 'Instagram', 'Twitter', 'GitHub'].map((platform) => (
                        <li key={platform}>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-200"
                            >
                                <span className="sr-only">{platform}</span>
                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    {/* SVG paths for each platform */}
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;