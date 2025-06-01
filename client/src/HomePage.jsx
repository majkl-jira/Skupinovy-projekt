import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./components/Layout/Layout";
import RecipeCard from "@/components/RecipeCard/RecipeCard"; // můžeš přejmenovat pokud chceš
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        const sortedRecipes = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setRecipes(sortedRecipes);
      } catch (error) {
        console.error("Chyba při načítání receptů:", error);
        setError("Nepodařilo se načíst recepty.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Layout>
      {/* Hero sekce */}
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/images/food.png"
              className="object-cover w-full h-full"
              alt="Pozadí s jídlem"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute px-16 max-w-xl text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Recepty z celého světa</h1>
          <p className="mt-4 text-lg md:text-xl">
            Objevte chutě a vůně domova i exotiky.
          </p>
        </div>
      </section>

      {/* Nejnovější recepty */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="text-center w-full mb-8">
            <h2 className="text-2xl md:text-4xl font-medium">Nejnovější recepty</h2>
            <p className="text-base md:text-lg text-gray-600">
              Vyzkoušejte nejnovější kulinářské inspirace
            </p>
          </div>
          {isLoading ? (
            <div className="text-center">Načítám recepty...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : recipes.length === 0 ? (
            <div className="text-center">Zatím zde nejsou žádné recepty.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe._id} />
              ))}

            </div>
          )}
        </div>
      </section>

      {/* O nás */}
      <section className="py-16 bg-gray-100 text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O nás</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              {/* Tady může být místo na obrázek nebo něco jiného */}
            </div>
            <div className="md:w-2/3">
              <p className="text-lg mb-4">
                Vítejte na našem receptovém portálu! Milujeme dobré jídlo a chceme
                se s vámi podělit o ty nejlepší recepty, které si zamilujete.
              </p>
              <p className="text-lg mb-4">
                Ať už jste začátečník nebo zkušený kuchař, najdete u nás inspiraci
                pro každou příležitost. Naše recepty jsou ověřené a chutné.
              </p>
              <div className="flex items-center text-gray-700">
                <MapPin size={20} className="mr-2" />
                <span>Praha, Česká republika</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
