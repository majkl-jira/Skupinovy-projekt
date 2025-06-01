import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RecipeCard({ recipe }) {
  const fallbackImage = "/images/default-recipe-image.jpg"; // Cesta k výchozímu obrázku

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      <img 
        src={recipe.image || fallbackImage} 
        alt={recipe.title || recipe.name || "Recept"} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow text-white">
        <h2 className="text-xl font-bold mb-2">{recipe.title || recipe.name}</h2>
        
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>
            {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString('cs-CZ') : "Bez datumu"}
          </span>
          <span>
            {recipe.author?.name || 'Neznámý autor'}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 flex-grow">
          {recipe.description 
            ? recipe.description.length > 120 
              ? recipe.description.substring(0, 120) + "..." 
              : recipe.description 
            : "Popis není k dispozici."}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags?.length > 0 ? (
            recipe.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">Bez tagů</span>
          )}
        </div>
        
        <div className="mt-auto">
          <Link to={`/recepty/${recipe._id}`}>
            <Button variant="outline" size="sm" className="w-full">
              Číst více
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
