import { createRoot } from 'react-dom/client'
import './style.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchInvestigator from './screens/SearchInvestigator';
import SimulateCombat from './screens/SimulateCombat';
import InfoForm from './forms/InfoForm';
import CharacteristicsForm from './forms/CharacteristicsForm';
import WeaponsForm from './forms/WeaponsForm';
import SkillsForm from './forms/SkillsForm';
import BackgroundForm from './forms/BackgroundForm';
import SaveInvestigator from './forms/SaveInvestigator';
import PossessionsForm from './forms/PossessionsForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoForm />,
  },
  {
    path: "/search",
    element: <SearchInvestigator />,
  },
  {
    path: "/combat",
    element: <SimulateCombat />,
  },
  {
    path: "/characteristics",
    element: <CharacteristicsForm />,
  },
  {
    path: "/skills",
    element: <SkillsForm />,
  },
  {
    path: "/weapons",
    element: <WeaponsForm />,
  },
  {
    path: "/possessions",
    element: <PossessionsForm />,
  },
  {
    path: "/background",
    element: <BackgroundForm />,
  },
  {
    path: "/save",
    element: <SaveInvestigator />,
  },
]);



const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <RouterProvider router={router} />
)
