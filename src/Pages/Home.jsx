import { useLoaderData, Link } from 'react-router';
import Banner from '../Components/Banner.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';

const Home = () => {
    const data = useLoaderData();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Banner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Top Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.slice(0, 6).map((recipeCard) => (
                        <RecipeCard key={recipeCard._id} recipeCard={recipeCard} />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link
                        to="/recipes"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                        See All Recipes
                    </Link>
                </div>
            </div>
            <section className="bg-white dark:bg-gray-800 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Cook with Us?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Discover easy, delicious recipes for every occasion.</p>
                </div>
            </section>
            <section className="bg-gray-100 dark:bg-gray-900 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Join Our Community</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Share your recipes and connect with food lovers worldwide.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;