import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';

const RecipeCard = ({ recipeCard }) => {
    const { _id, categories, cuisine, image, prepTime, title, likes, userId } = recipeCard;
    const { saveUser } = useContext(AuthContext);
    const [currentLikes, setCurrentLikes] = useState(likes);

    const handleLike = async () => {
        if (!saveUser) {
            toast.error('Please log in to like a recipe.', { autoClose: 2000 });
            return;
        }

        if (saveUser.uid === userId) {
            toast.error('You cannot like your own recipe.', { autoClose: 2000 });
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
                setCurrentLikes(data.likes);
                toast.success('Recipe liked!', { autoClose: 2000 });
            } else {
                toast.error(data.error || 'Failed to like recipe.', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 2000 });
        }
    };

    // Normalize categories to always be an array
    const normalizedCategories = Array.isArray(categories)
        ? categories
        : typeof categories === 'string'
            ? [categories]
            : [];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden w-full h-full max-w-sm mx-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
            <div className="relative">
                <img
                    src={image || ''}
                    alt={title}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-md transition-opacity duration-300">
                    <span>👍 {currentLikes}</span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                        onClick={handleLike}
                        disabled={!saveUser || saveUser?.uid === userId}
                        className={`p-2 rounded-full text-white transition-colors ${
                            saveUser && saveUser?.uid !== userId
                                ? 'bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                    {normalizedCategories.length > 0 ? (
                        normalizedCategories.map((category, index) => (
                            <span
                                key={index}
                                className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 px-2.5 py-1 rounded-full transition-transform duration-200 hover:scale-105"
                            >
                {category}
              </span>
                        ))
                    ) : (
                        <span className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 px-2.5 py-1 rounded-full">
              Uncategorized
            </span>
                    )}
                </div>
                <h3 className="text-2xl font-bold mt-3 text-gray-900 dark:text-gray-100 transition-opacity duration-300">
                    {title}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mt-3">
          <span className="flex items-center">
            <img
                src={`https://flagcdn.com/${
                    cuisine === 'Italian' ? 'it' : cuisine === 'Mexican' ? 'mx' : cuisine === 'Indian' ? 'in' : 'cn'
                }.svg`}
                alt={cuisine}
                className="w-5 h-5 mr-1 rounded-full"
            />
              {cuisine}
          </span>
                    <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h1v5l4.25 2.55.75-1.23-3.75-2.25V7z"/>
            </svg>
                        {prepTime} min
          </span>
                </div>
                <div className="mt-auto mb-5">
                    <Link
                        to={`/recipe/${_id}`}
                        className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 hover:scale-105 mt-5"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;