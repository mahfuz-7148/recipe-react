import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import { Tooltip } from 'react-tooltip';
import Banner from '../Components/Banner.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';

// Import react-tooltip CSS
import 'react-tooltip/dist/react-tooltip.css';


const Home = () => {
    const data = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(data.slice(0, 6));


    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (!searchQuery.trim()) {
                setFilteredRecipes(data.slice(0, 6));
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3000/addRecipe?search=${encodeURIComponent(searchQuery)}`
                );
                const searchResults = await response.json();
                setFilteredRecipes(searchResults.slice(0, 6));
            } catch (error) {
                console.error('Search error:', error);
                setFilteredRecipes([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, data]);

    // Sample cuisines data
    const popularCuisines = [
        { name: 'Italian', image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-8-550x690.jpg' },
        { name: 'Mexican', image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-15-550x690.jpg' },
        { name: 'Indian', image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-26-550x690.jpg' },
        { name: 'Chinese', image: 'https://demo.gloriathemes.com/platea/demo/wp-content/uploads/2024/12/recipe-25-550x690.jpg' },
    ];

    // Sample cooking tips
    const cookingTips = [
        'Use fresh ingredients for the best flavor.',
        'Preheat your oven 10 minutes before baking.',
        'Add a pinch of salt to enhance sweetness.',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Banner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar */}
                <div className="mb-10 flex justify-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search recipes by title or cuisine..."
                        className="w-full max-w-2xl p-4 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 placeholder-gray-400 dark:placeholder-gray-500 shadow-lg transition-all duration-300"
                        data-tooltip-id="search-tooltip"
                        data-tooltip-content="Type a recipe name or cuisine to find your next meal!"
                    />
                    <Tooltip id="search-tooltip" place="top" effect="solid" />
                </div>

                {/* Top Recipes Section */}
                <section className="mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">
                        Top Recipes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipeCard) => (
                                <RecipeCard key={recipeCard._id} recipeCard={recipeCard} />
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
                                No recipes found.
                            </p>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            to="/recipes"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                        >
                            See All Recipes
                        </Link>
                    </div>
                </section>

                {/* Popular Cuisines Section */}
                <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Popular Cuisines
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularCuisines.map((cuisine, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                data-tooltip-id={`cuisine-tooltip-${index}`}
                                data-tooltip-content={`Discover ${cuisine.name} recipes!`}
                            >
                                <img
                                    src={cuisine.image}
                                    alt={cuisine.name}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-3 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {cuisine.name}
                                    </h3>
                                    <Link
                                        to={`/recipes?cuisine=${cuisine.name}`}
                                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                                    >
                                        Explore
                                    </Link>
                                </div>
                                <Tooltip id={`cuisine-tooltip-${index}`} place="top" effect="solid" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cooking Tips Section */}
                <section className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Cooking Tips
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cookingTips.map((tip, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                data-tooltip-id={`tip-tooltip-${index}`}
                                data-tooltip-content="Try this tip for better cooking results!"
                            >
                                <p className="text-gray-600 dark:text-gray-400">{tip}</p>
                                <Tooltip id={`tip-tooltip-${index}`} place="top" effect="solid" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;