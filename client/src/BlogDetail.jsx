import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Calendar, User, Tag } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(blogRes.data);
        try {
          const userRes = await axios.get("http://localhost:5000/users/me");
          setIsAdmin(userRes.data.isAdmin);
        } catch (userError) {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Chyba při načítání blogu:", error);
        setError("Nepodařilo se načíst blog.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Opravdu chcete smazat tento blog?")) {
      try {
        await axios.delete(`http://localhost:5000/blogs/${id}`);
        navigate("/blogs");
      } catch (error) {
        console.error("Chyba při mazání blogu:", error);
        setError("Blog se nepodařilo smazat");
      }
    }
  };

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
          <p className="mt-4">Načítám blog...</p>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 bg-black text-white">
          <div className="bg-red-500 text-white p-4 rounded">
            {error || "Blog nebyl nalezen"}
          </div>
          <Button onClick={() => navigate("/blogs")} className="mt-4">
            <ArrowLeft className="mr-2" size={16} />
            Zpět na blogy
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative w-full h-[60vh] bg-black">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80 mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>{new Date(blog.date).toLocaleDateString("cs-CZ")}</span>
            </div>

            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>{blog.author ? blog.author.name : "Neznámý autor"}</span>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={16} className="mr-1" />
                {blog.tags.map((tag, index) => (
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

          {isAdmin && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/blog/edit/${blog._id}`)}
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

      <div className="container mx-auto px-4 py-6 bg-black text-white">
        <Button
          variant="outline"
          onClick={() => navigate("/blogs")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" size={16} />
          Zpět na blogy
        </Button>

        <article className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="prose prose-invert max-w-none">
            {blog.content &&
              blog.content.split("\n").map((paragraph, index) =>
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
