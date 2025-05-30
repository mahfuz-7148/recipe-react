import { useContext } from 'react';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddRecipe = () => {
    const { saveUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!saveUser?.email) {
        navigate('/login');
        toast.warn('Please log in to add a recipe.', { autoClose: 2000 });
    }

    const addRecipesForm = async (e) => {
        e.preventDefault();
        const form = e.target;

        const image = form.image.value;
        const title = form.title.value;
        const ingredients = form.ingredients.value;
        const instructions = form.instructions.value;
        const cuisine = form.cuisine.value;
        const prepTime = parseInt(form.prepTime.value, 10);
        const categories = Array.from(form.categories)
            .filter((input) => input.checked)
            .map((input) => input.value);

        if (!title || !ingredients || !instructions || !cuisine || !prepTime) {
            toast.error('Please fill in all required fields.', { autoClose: 2000 });
            return;
        }

        if (!saveUser) {
            toast.error('Please log in to add a recipe.', { autoClose: 2000 });
            return;
        }

        const addRecipe = {
            image,
            title,
            ingredients,
            instructions,
            cuisine,
            prepTime,
            categories,
            likes: 0,
            userId: saveUser.uid,
            isPublic: true,
        };

        try {
            const response = await fetch('https://recipe-react-black.vercel.app/addRecipe', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(addRecipe),
            });
            if (response.ok) {
                toast.success('Recipe added successfully!', { autoClose: 2000 });
                navigate('/recipes');
            } else {
                toast.error('Failed to add recipe.', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 2000 });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center px-4 py-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Add New Recipe</h2>
                <form onSubmit={addRecipesForm} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients</label>
                        <textarea
                            name="ingredients"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions</label>
                        <textarea
                            name="instructions"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine Type</label>
                        <select
                            name="cuisine"
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
                                        className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                        >
                            Add Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;