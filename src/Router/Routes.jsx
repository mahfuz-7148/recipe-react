import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/Root.jsx';
import Home from '../Pages/Home.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import AllRecipes from '../Components/AllRecipes.jsx';
import AddRecipe from '../Components/AddRecipe.jsx';
import MyRecipes from '../Components/MyRecipes.jsx';
import NotFound from '../Components/NotFound.jsx';
import RecipeDetails from '../Components/RecipeDetails.jsx';
import PrivateRoute from './PrivateRoute.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                loader: () => fetch('https://b11-a11-recipe-book-server.vercel.app/addRecipe?sort=-likes&limit=6'),
                Component: Home,
            },
            {
                path: '/recipes',
                loader: ({ request }) => {
                    const url = new URL(request.url);
                    const cuisine = url.searchParams.get('cuisine');
                    return fetch(`https://b11-a11-recipe-book-server.vercel.app/addRecipe${cuisine ? `?cuisine=${cuisine}` : ''}`);
                },
                Component: AllRecipes,
            },
            {
                path: '/addRecipe',
                element: <AddRecipe />,
            },
            {
                path: '/myRecipes',
                loader: async () => {
                    const userId = 'current_user_id'; // Replace with saveUser.uid from AuthContext (requires context in loader)
                    return fetch(`https://b11-a11-recipe-book-server.vercel.app/addRecipe?userId=${userId}`);
                },
                element: <MyRecipes />,
            },
            {
                path: '/recipe/:id',
                loader: ({ params }) => fetch(`https://b11-a11-recipe-book-server.vercel.app/addRecipe/${params.id}`),
                element: <PrivateRoute>
                    <RecipeDetails />
                </PrivateRoute>
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
        ],
    },
    {
        path: '/*',
        Component: NotFound,
    },
]);