import {use} from 'react';
import {AuthContext} from '../Contexts/Authprovider.jsx';
import {Navigate} from 'react-router';


const PrivateRoute = ({children}) => {
    const {saveUser, loading} = use(AuthContext)

    if (loading){
        return (
            <div className="flex justify-center gap-4 mt-4">

                <button type="button"
                        className="px-5 py-2.5 cursor-pointer flex items-center justify-center text-white text-sm tracking-wider font-medium border-none outline-none bg-purple-600 hover:bg-purple-700 active:bg-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="mr-2 inline animate-spin"
                         viewBox="0 0 26.349 26.35">
                        <circle cx="13.792" cy="3.082" r="3.082" data-original="#000000"/>
                        <circle cx="13.792" cy="24.501" r="1.849" data-original="#000000"/>
                        <circle cx="6.219" cy="6.218" r="2.774" data-original="#000000"/>
                        <circle cx="21.365" cy="21.363" r="1.541" data-original="#000000"/>
                        <circle cx="3.082" cy="13.792" r="2.465" data-original="#000000"/>
                        <circle cx="24.501" cy="13.791" r="1.232" data-original="#000000"/>
                        <path
                            d="M4.694 19.84a2.155 2.155 0 0 0 0 3.05 2.155 2.155 0 0 0 3.05 0 2.155 2.155 0 0 0 0-3.05 2.146 2.146 0 0 0-3.05 0z"
                            data-original="#000000"/>
                        <circle cx="21.364" cy="6.218" r=".924" data-original="#000000"/>
                    </svg>
                    Loading
                </button>

            </div>
        )
    }

    if (! saveUser) {
        return <Navigate to='/login'/>
    }


    return children



};

export default PrivateRoute;