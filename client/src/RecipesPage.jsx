import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./components/RecipeCard/RecipeCard"; // Ujisti se, že import je správný
import Layout from "./components/Layout/Layout";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "Vše", value: "" },
  { label: "Hlavní chody", value: "hlavni-chody" },
  { label: "Dezerty", value: "dezerty" },
  { label: "Předkrmy", value: "predkrmy" },
  { label: "Polévky", value: "polevky" },
  { label: "Nápoje", value: "napoje" },
];

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const url = activeCategory
          ? `http://localhost:5000/recipes?category=${activeCategory}`
          : `http://localhost:5000/recipes`;

        const response = await axios.get(url);
        setRecipes(response.data);
        setError("");
      } catch (err) {
        console.error("Chyba při načítání receptů:", err);
        setError("Nepodařilo se načíst recepty.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [activeCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Recepty</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              variant={activeCategory === cat.value ? "default" : "outline"}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <p>Načítám recepty...</p>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded">{error}</div>
        ) : recipes.length === 0 ? (
          <p>Žádné recepty k dispozici.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
