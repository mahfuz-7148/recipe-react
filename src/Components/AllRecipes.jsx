import { useLoaderData, useSearchParams } from 'react-router';
import { Tooltip } from 'react-tooltip';
import RecipeCard from './RecipeCard.jsx';

// Import react-tooltip CSS
import 'react-tooltip/dist/react-tooltip.css';

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
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    data-tooltip-id="filter-tooltip"
                    data-tooltip-content="Select a cuisine to filter recipes"
                >
                    Filter by Cuisine
                </label>
                <select
                    value={cuisine}
                    onChange={handleFilter}
                    className="mt-1 w-full sm:w-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-tooltip-id="select-tooltip"
                    data-tooltip-content="Choose a cuisine or select 'All Cuisines' to view all recipes"
                >
                    <option value="">All Cuisines</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Others">Others</option>
                </select>
                <Tooltip id="filter-tooltip" place="top" effect="solid" />
                <Tooltip id="select-tooltip" place="top" effect="solid" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((recipeCard) => (
                        <div
                            key={recipeCard._id}
                            data-tooltip-id={`recipe-tooltip-${recipeCard._id}`}
                            data-tooltip-content={`View details for ${recipeCard.title || 'this recipe'}`}
                        >
                            <RecipeCard recipeCard={recipeCard} />
                            <Tooltip id={`recipe-tooltip-${recipeCard._id}`} place="top" effect="solid" />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
                        No recipes found for this cuisine.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllRecipes;