import Layout from "@/components/Layout/Layout";
import RecipeCard from "@/components/RecipeCard/RecipeCard"; // můžeš přejmenovat pokud chceš
import axios from "axios";
import { useState, useEffect } from "react";

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
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/images/recipesbackground.jpg" // uprav podle kategorie
              className="object-cover w-full h-full"
              alt="Pozadí receptů"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute px-16 max-w-xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Nápoje</h1>
          <p className="text-lg md:text-xl mt-4">Recepty na chutné polévky.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {loading && <p>Načítám...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
