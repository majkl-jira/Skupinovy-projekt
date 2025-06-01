import RecipeAdd from "@/components/RecipeAdd/RecipeAdd";
import PolevkyPage from "@/polevky";
import DezertyPage from "@/dezerty";
import HlavniChodyPage from "@/hlavniChody";
import PredkrmyPage from "@/predkrmy";
import NapojePage from "@/napoje";
import HomePage from "@/HomePage";
import Galerie from "@/Galerie";
import RecipeDetail from "@/RecipesDetail";
import RecipeEdit from "@/components/RecipeEdit/RecipeEdit";
import RecipesPage from "@/RecipesPage";
import AuthPage from "@/AuthPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/polevky" element={<PolevkyPage />} />
        <Route path="/dezerty" element={<DezertyPage />} />
        <Route path="/hlavni-chody" element={<HlavniChodyPage />} />
        <Route path="/predkrmy" element={<PredkrmyPage />} />
        <Route path="/napoje" element={<NapojePage />} />

        <Route path="/recepty" element={<RecipesPage />} />
        <Route path="/recepty/pridat" element={<RecipeAdd />} />
  	    <Route path="/recepty/edit/:id" element={<RecipeEdit />} />
        <Route path="/recepty/:id" element={<RecipeDetail />} />
        <Route path="/auth" element={<AuthPage />} />


        <Route path="/galerie" element={<Galerie />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
