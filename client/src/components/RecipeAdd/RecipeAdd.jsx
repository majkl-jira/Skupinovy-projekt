import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecipeAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const recipeData = {
        name: formData.title,
        description: formData.content,      // možná popis receptu
        instructions: formData.content,     // pokud backend má samostatné pole instructions, dej to tam taky
        image: formData.image,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      
      
      await axios.post("http://localhost:5000/recipes", recipeData);
      
      setSuccess("Recept byl úspěšně vytvořen!");
      setTimeout(() => {
        navigate("/recepty");
      }, 2000); 
    } catch (error) {
      console.error("Chyba při ukládání receptu:", error);
      setError("Recept se nepodařilo uložit. Zkontrolujte zadané údaje.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Přidat nový recept</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate("/recepty")} 
              className="hover:bg-gray-800"
            >
              Zrušit a vrátit se
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
                  placeholder="např. italská, vegetariánská, rychlá"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="block text-sm font-medium mb-1">
                  Postup / obsah receptu
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
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Ukládám..." : "Vytvořit recept"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
