import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";


export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5173/recepty/${id}`);
        setRecipe(res.data);
      } catch (error) {
        if (error.response) {
          // Server odpověděl s chybou, např. 404, 500
          console.error("Chyba serveru:", error.response.status, error.response.data);
        } else if (error.request) {
          // Požadavek byl odeslán, ale server neodpověděl
          console.error("Žádná odpověď od serveru:", error.request);
        } else {
          // Něco jiného při nastavování požadavku
          console.error("Chyba při nastavování požadavku:", error.message);
        }
        setError("Nepodařilo se načíst recept.");
      }finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center bg-black text-white">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-lg bg-gray-700 h-64 w-full mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
          <p className="mt-4">Načítám recept...</p>
        </div>
      </Layout>
    );
  }

  if (error || !recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 bg-black text-white">
          <div className="bg-red-500 text-white p-4 rounded">
            {error || "Recept nebyl nalezen"}
          </div>
          <Button onClick={() => navigate("/polevky")} className="mt-4">
            <ArrowLeft className="mr-2" size={16} />
            Zpět na recepty
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero sekce s obrázkem */}
      <div className="relative w-full h-[60vh] bg-black">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80 mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>{new Date(recipe.date).toLocaleDateString("cs-CZ")}</span>
            </div>

            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>{recipe.chef ? recipe.chef.name : "Neznámý kuchař"}</span>
            </div>

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={16} className="mr-1" />
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Obsah receptu */}
      <div className="container mx-auto px-4 py-6 bg-black text-white">
        <Button
          variant="outline"
          onClick={() => navigate("/recepty")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" size={16} />
          Zpět na recepty
        </Button>

        <article className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="prose prose-invert max-w-none">
            {recipe.content &&
              recipe.content.split("\n").map((paragraph, index) =>
                paragraph ? (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ) : (
                  <br key={index} />
                )
              )}
          </div>
        </article>
      </div>
    </Layout>
  );
}
