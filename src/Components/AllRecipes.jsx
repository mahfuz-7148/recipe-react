import { useLoaderData, useSearchParams } from 'react-router';
import RecipeCard from './RecipeCard.jsx';

const AllRecipes = () => {
    const allData = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const cuisine = searchParams.get('cuisine') || '';

    const filteredData = cuisine ? allData.filter(recipe => recipe.cuisine === cuisine) : allData;

    const handleFilter = (e) => {
        const selectedCuisine = e.target.value;
        setSearchParams(selectedCuisine ? { cuisine: selectedCuisine } : {});
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Cuisine</label>
                <select
                    value={cuisine}
                    onChange={handleFilter}
                    className="mt-1 w-full sm:w-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Cuisines</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.map((recipeCard) => (
                    <RecipeCard key={recipeCard._id} recipeCard={recipeCard} />
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;