import { useLoaderData, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';

const RecipeDetails = () => {
    const recipe = useLoaderData();
    const { saveUser } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(recipe.likes || 0);
    const navigate = useNavigate();


    const formatCategories = (categories) =>
        Array.isArray(categories) ? categories.join(', ') : categories || 'None';

    const handleLike = async () => {
        if (!saveUser) {
            toast.error('Please log in to like this recipe.', { autoClose: 2000 });
            return;
        }

        if (saveUser.uid === recipe.userId) {
            toast.error('You cannot like your own recipe.', { autoClose: 2000 });
            return;
        }

        try {
            const response = await fetch(`https://recipe-server-ptjv.onrender.com/addRecipe/${recipe._id}/like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: saveUser.uid }),
            });

            const data = await response.json();

            if (response.ok) {
                setLikeCount(data.likes);
                toast.success('Recipe liked!', { autoClose: 2000 });
            } else {
                toast.error(data.error || 'Failed to like recipe.', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 2000 });
        }
    };

    return (
        <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{recipe.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{likeCount} people interested in this recipe</p>
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 sm:h-80 object-cover rounded-md mb-6"
            />
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
                <p><strong>Categories:</strong> {formatCategories(recipe.categories)}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    onClick={handleLike}
                    disabled={!saveUser || saveUser?.uid === recipe.userId}
                    className={`px-4 py-2 rounded-md text-white transition-colors ${
                        saveUser && saveUser?.uid !== recipe.userId
                            ? 'bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Like
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default RecipeDetails;