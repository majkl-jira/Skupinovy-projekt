import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer.jsx";

const blogs = [
  { id: 1, title: "První blog", content: "Toto je obsah prvního blogu." },
  { id: 2, title: "Druhý blog", content: "Toto je obsah druhého blogu." },
];

function Header() {
  return (
    <header className="bg-[#3C3B6E] text-white w-full shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-bold">Blogly</h1>
          <nav className="flex divide-x divide-[#B22234]">
            <Link
              to="/"
              className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
            >
              Home
            </Link>
            <Link
              to="/o-autorovi"
              className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
            >
              O autorovi
            </Link>
            <Link
              to="/recenze"
              className="px-6 text-white transition transform duration-300 hover:scale-105 font-medium"
            >
              Recenze
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Header />
      <main className="flex-1 w-full p-8 container mx-auto">
        <section className="grid grid-cols-2 gap-8 w-full">
          {blogs.map((blog) => (
            <Card key={blog.id} className="w-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#3C3B6E]">
                  {blog.title}
                </h3>
                <p className="mb-4 text-gray-700">
                  {blog.content.substring(0, 100)}...
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-[#B22234] hover:underline font-medium"
                >
                  Číst více →
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Header />
      <main className="flex-1 w-full p-8 container mx-auto">
        <Card className="w-full">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#3C3B6E]">
              {blog?.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {blog?.content}
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export function AboutAuthor() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Header />
      <main className="flex-1 w-full p-8 container mx-auto">
        <Card className="w-full">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#3C3B6E]">
              O autorovi
            </h2>
            <div className="text-lg leading-relaxed text-gray-700 space-y-4">
              <p>
                Jsem nadšený bloger, který sdílí své myšlenky o technologiích, programování a designu.
              </p>
              <p>
                Mám více než 10 let zkušeností v oboru a rád se dělím o své poznatky s ostatními.
              </p>
              <p>
                Můžete mě kontaktovat přes formulář v patičce stránky.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export function Reviews() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      <Header />
      <main className="flex-1 w-full p-8 container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#3C3B6E]">Recenze</h2>
        <p className="text-lg text-gray-700">
          Připravujeme kvalitní recenze.
        </p>
      </main>
      <Footer />
    </div>
  );
}
