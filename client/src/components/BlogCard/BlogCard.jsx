import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      <img 
        src={blog.image} 
        alt={blog.title} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>
            {blog.date && new Date(blog.date).toLocaleDateString('cs-CZ')}
          </span>
          <span>
            {blog.author ? blog.author.name : 'Neznámý autor'}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 flex-grow">
          {blog.content && blog.content.substring(0, 120)}
          {blog.content && blog.content.length > 120 ? '...' : ''}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags && blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto">
          <Link to={`/blog/${blog._id}`}>
            <Button variant="outline" size="sm" className="w-full">
              Číst více
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}