import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const banners = [
    {
        id: 1,
        image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-2-630x785.jpg',
        alt: 'Pizza',
        title: 'Savor the Perfect Slice',
    },
    {
        id: 2,
        image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-9-550x690.jpg',
        alt: 'Burger',
        title: 'Juicy Burgers Await',
    },
    {
        id: 3,
        image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-8-550x690.jpg',
        alt: 'Pasta',
        title: 'Indulge in Creamy Pasta',
    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
    const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

    const handleImageError = (e) => {
        console.error('Image failed to load:', e.target.src);
        e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
    };

    return (
        <div
            className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                        index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.alt}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/70 to-transparent">
                        <div className="relative">
                            <h2
                                className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-6 drop-shadow-xl ${
                                    index === current ? 'animate-slide-up' : ''
                                }`}
                            >
                                {index === current && (
                                    <Typewriter
                                        words={[banner.title]}
                                        loop={1}
                                        cursor
                                        cursorStyle=""
                                        typeSpeed={70}
                                        delaySpeed={1000}
                                    />
                                )}
                                <span className="block w-16 h-1 mx-auto mt-5 bg-white/80 rounded-full"></span>
                            </h2>
                            <button
                                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full text-lg font-semibold transition-all duration-300 transform ${
                                    index === current ? 'animate-slide-up-delayed' : ''
                                }`}
                            >
                                <Link to="/recipes">Explore Now</Link>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 p-4 rounded-full text-white z-10 transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 p-4 rounded-full text-white z-10 transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-8 h-8" />
            </button>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            index === current ? 'bg-white scale-125' : 'bg-gray-400/60 hover:bg-gray-300/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-slide-up-delayed {
          animation: slide-up 0.6s ease-out 0.3s forwards;
        }
      `}</style>
        </div>
    );
}