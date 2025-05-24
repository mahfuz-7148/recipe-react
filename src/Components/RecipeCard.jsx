import { useContext, useState } from 'react';
import { Link } from 'react-router'; // Updated import to match React Router v6
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';

const RecipeCard = ({ recipeCard }) => {
    const { _id, categories, cuisine, image, prepTime, title, likes, userId } = recipeCard;
    const { saveUser } = useContext(AuthContext);
    const [currentLikes, setCurrentLikes] = useState(likes || 0);

    const handleLike = async () => {
        if (!saveUser) {
            toast.error('Please log in to like a recipe.');
            return;
        }

        if (saveUser.uid === userId) {
            toast.error('You cannot like your own recipe.');
            return;
        }

        try {
            const response = await fetch(`https://b11-a11-recipe-book-server.vercel.app/addRecipe/${_id}/like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: saveUser.uid }),
            });

            const data = await response.json();

            if (response.ok) {
                setCurrentLikes(data.likes); // Update UI with backend response
                toast.success('Recipe liked!');
            } else {
                toast.error(data.error || 'Failed to like recipe.');
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto transition-transform hover:scale-105">
            <div className="relative">
                <img
                    src={image || 'https://via.placeholder.com/150'}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <span>👍 {currentLikes}</span>
                </div>

            </div>
            <div className="p-4">
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <span
                                key={index}
                                className="bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-200 px-2 py-1 rounded"
                            >
                {category}
              </span>
                        ))
                    ) : (
                        <span className="bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-200 px-2 py-1 rounded">
              Uncategorized
            </span>
                    )}
                </div>
                <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cuisine}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span className="flex items-center">
            <img
                src={`https://flagcdn.com/${
                    cuisine === 'Italian' ? 'it' : cuisine === 'Mexican' ? 'mx' : cuisine === 'Indian' ? 'in' : 'cn'
                }.svg`}
                alt={cuisine}
                className="w-4 h-4 mr-1"
            />
              {cuisine}
          </span>
                    <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
                        {prepTime} min
          </span>
                </div>
                <Link
                    to={`/recipe/${_id}`}
                    className="mt-4 block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;