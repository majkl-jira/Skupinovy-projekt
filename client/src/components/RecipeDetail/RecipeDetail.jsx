import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Edit,
  Trash2,
} from "lucide-react";

export default function RecipeDetail() {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(res.data);
        

        try {
          const userRes = await axios.get("http://localhost:5000/users/me", {
            withCredentials: true,
          });
          setIsAdmin(userRes.data.isAdmin);
        } catch (userError) {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Chyba při načítání receptu:", err);
        setError("Nepodařilo se načíst recept.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Opravdu chcete smazat tento recept?")) {
      try {
        await axios.delete(`http://localhost:5000/recipes/${id}`, {
          withCredentials: true,
        });
        navigate("/recepty");
      } catch (err) {
        setError("Recept se nepodařilo smazat");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-white text-center">
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
      {/* Úvodní obrázek s přechodem */}
      <div className="relative w-full h-[60vh] bg-black">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80 mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>
                {recipe.date
                  ? new Date(recipe.date).toLocaleDateString("cs-CZ")
                  : "Neznámé datum"}
              </span>
            </div>

            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>
                {recipe.author?.name || "Neznámý autor"}
              </span>
            </div>

            {recipe.tags?.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={16} className="mr-1" />
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 text-white text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/recept/edit/${recipe._id}`)}
              >
                <Edit size={16} className="mr-2" />
                Upravit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 size={16} className="mr-2" />
                Smazat
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tělo receptu */}
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
              recipe.content.split("\n").map((paragraph, idx) =>
                paragraph ? (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ) : (
                  <br key={idx} />
                )
              )}
          </div>
        </article>
      </div>
    </Layout>
  );
}
