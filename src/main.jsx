import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router';
import {router} from './Router/Routes.jsx';
import Authprovider from './Contexts/Authprovider.jsx';
import {ThemeProvider} from './Contexts/ThemeContext.jsx';



createRoot(document.getElementById('root')).render(


     <ThemeProvider>
         <Authprovider>
             <RouterProvider router={router} />
         </Authprovider>
     </ThemeProvider>

)
