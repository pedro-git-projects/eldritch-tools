import { createRoot } from 'react-dom/client'
import './style.css'
import CreateInvestigator from './screens/CreateInvestigator'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchInvestigator from './screens/SearchInvestigator';
import SimulateCombat from './screens/SimulateCombat';


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateInvestigator />,
  },
  {
    path: "/search",
    element: <SearchInvestigator />,
  },
  {
    path: "/combat",
    element: <SimulateCombat />,
  },
]);



const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <RouterProvider router={router} />
)
