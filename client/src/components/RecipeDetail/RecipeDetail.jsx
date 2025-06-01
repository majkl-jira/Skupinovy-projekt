import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Chyba při načítání receptu:", err);
        setError("Nepodařilo se načíst recept.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          Načítám recept...
        </div>
      </Layout>
    );
  }

  if (error || !recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          {error || "Recept nebyl nalezen."}
          <div className="mt-4">
            <Button onClick={() => navigate("/recepty")}>
              <ArrowLeft size={16} className="mr-2" />
              Zpět na recepty
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button onClick={() => navigate("/recepty")} className="mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Zpět na recepty
        </Button>

        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full max-h-96 object-cover rounded mb-6"
          />
        )}

        <p className="mb-6 whitespace-pre-line">{recipe.content}</p>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
