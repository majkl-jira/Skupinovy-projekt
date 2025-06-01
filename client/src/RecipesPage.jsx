import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import Layout from "@/components/Layout/Layout";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nepodařilo se načíst recepty.");
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <section className="py-10 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Všechny recepty</h1>
        {loading && <p>Načítám...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
