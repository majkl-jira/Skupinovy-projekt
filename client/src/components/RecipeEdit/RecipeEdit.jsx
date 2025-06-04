import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: ""
  }); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipes/${id}`);
        const recipe = res.data.recipe;
        setFormData({
          title: recipe.title,
          content: recipe.content,
          image: recipe.image,
          tags: recipe.tags ? recipe.tags.join(", ") : ""
        });
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
        setError("Nepodařilo se načíst data receptu.");
        setTimeout(() => navigate("/recepty"), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const recipeData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      };
      await axios.put(`http://localhost:5000/recipes/${id}`, recipeData);
      setSuccess("Recept byl úspěšně aktualizován!");
      setTimeout(() => {
        navigate(`/recepty/${id}`);
      }, 2000);
    } catch (error) {
      console.error("Chyba při aktualizaci receptu:", error);
      setError("Recept se nepodařilo aktualizovat. Zkontrolujte zadané údaje.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center text-white">
          Načítám data receptu...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Upravit recept</h1>
            <Button
              variant="outline"
              onClick={() => navigate(`/recepty/${id}`)}
              className="hover:bg-gray-800"
            >
              Zrušit úpravy
            </Button>
          </div>

          {error && (
            <div className="bg-red-500/80 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/80 text-white p-4 rounded mb-4">
              {success}
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium mb-1">
                  Název receptu
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600"
                  required
                />
              </div>

              <div>
                <Label htmlFor="image" className="block text-sm font-medium mb-1">
                  URL obrázku
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tags" className="block text-sm font-medium mb-1">
                  Tagy (oddělené čárkou)
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600"
                  placeholder="např. zdravé, rychlé, bezlepkové"
                />
              </div>

              <div>
                <Label htmlFor="content" className="block text-sm font-medium mb-1">
                  Popis / postup
                </Label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded h-64"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Ukládám..." : "Aktualizovat recept"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
