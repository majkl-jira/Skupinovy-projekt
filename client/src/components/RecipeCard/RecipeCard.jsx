import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>

        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>
            {recipe.date && new Date(recipe.date).toLocaleDateString("cs-CZ")}
          </span>
          <span>
            {recipe.author?.name || "Neznámý autor"}
          </span>
        </div>

        <p className="text-gray-300 mb-4 flex-grow">
          {recipe.content?.substring(0, 120)}
          {recipe.content?.length > 120 ? "..." : ""}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
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
