import RecipeAdd from "@/components/RecipeAdd/RecipeAdd";
import HomePage from "@/HomePage";
import RecipeDetail from "@/RecipesDetail";
import RecipeEdit from "@/components/RecipeEdit/RecipeEdit";
import RecipesPage from "@/RecipesPage";
import AuthPage from "@/AuthPage";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Kontakty from "@/Kontakty";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/kontakty" element={<Kontakty/>} />


        <Route path="/recepty" element={<RecipesPage />} />
        <Route path="/recepty/pridat" element={<RecipeAdd />} />
  	    <Route path="/recepty/edit/:id" element={<RecipeEdit />} />
        <Route path="/recepty/:id" element={<RecipeDetail />} />
        <Route path="/auth" element={<AuthPage />} />


      
      </Routes>
    </Router>
  );
};

export default AppRoutes;
