import { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';
import RecipeCard from './RecipeCard.jsx';

const MyRecipes = () => {
    const recipes = useLoaderData();
    const { saveUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [userRecipes, setUserRecipes] = useState(recipes);

    if (!saveUser?.email) {
        navigate('/login');
        toast.warn('Please log in to view your recipes.', { autoClose: 2000 });
    }

    useEffect(() => {
        if (saveUser) {
            const fetchUserRecipes = async () => {
                try {
                    const response = await fetch(`https://recipe-react-black.vercel.app/addRecipe?userId=${saveUser.uid}`);
                    const data = await response.json();
                    setUserRecipes(data);
                } catch (error) {
                    toast.error(`Error fetching recipes: ${error.message}`, { autoClose: 2000 });
                }
            };
            fetchUserRecipes();
        }
    }, [saveUser]);

    const handleUpdateClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedRecipe = {
            image: form.image.value,
            title: form.title.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,
            cuisine: form.cuisine.value,
            prepTime: parseInt(form.prepTime.value, 10),
            categories: Array.from(form.categories)
                .filter((input) => input.checked)
                .map((input) => input.value),
            likes: selectedRecipe.likes,
            userId: saveUser.uid,
        };

        try {
            const response = await fetch(`https://recipe-react-black.vercel.app/addRecipe/${selectedRecipe._id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updatedRecipe),
            });

            if (response.ok) {
                toast.success('Recipe updated successfully!', { autoClose: 2000 });
                setUserRecipes((prev) =>
                    prev.map((recipe) =>
                        recipe._id === selectedRecipe._id ? { ...recipe, ...updatedRecipe } : recipe
                    )
                );
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update recipe.', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 2000 });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://recipe-react-black.vercel.app/addRecipe/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Recipe deleted successfully!', { autoClose: 2000 });
                setUserRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
            } else {
                toast.error('Failed to delete recipe.', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 2000 });
        }
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Recipes</h2>
                <Link
                    to="/addRecipe"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                    Create Recipe
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userRecipes.map((recipe) => (
                    <div key={recipe._id} className="relative">
                        <RecipeCard recipeCard={recipe} />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                onClick={() => handleUpdateClick(recipe)}
                                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(recipe._id)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Update Recipe</h2>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={selectedRecipe.image}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={selectedRecipe.title}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients</label>
                                <textarea
                                    name="ingredients"
                                    defaultValue={selectedRecipe.ingredients}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions</label>
                                <textarea
                                    name="instructions"
                                    defaultValue={selectedRecipe.instructions}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine Type</label>
                                <select
                                    name="cuisine"
                                    defaultValue={selectedRecipe.cuisine}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Cuisine</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preparation Time (minutes)</label>
                                <input
                                    type="number"
                                    name="prepTime"
                                    defaultValue={selectedRecipe.prepTime}
                                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categories</label>
                                <div className="mt-2 space-y-2">
                                    {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'].map((category) => (
                                        <label key={category} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name="categories"
                                                value={category}
                                                defaultChecked={selectedRecipe.categories.includes(category)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                                >
                                    Update Recipe
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyRecipes;