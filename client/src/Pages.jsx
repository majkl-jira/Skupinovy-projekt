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
    <header className="bg-blue-900 text-white w-full shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Blogly</h1>
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="text-white transition transform duration-300 hover:scale-105 font-medium">
            Home
          </Link>
          <Link to="/o-autorovi" className="text-white transition transform duration-300 hover:scale-105 font-medium">
            O autorovi
          </Link>
          <Link to="/recenze" className="text-white transition transform duration-300 hover:scale-105 font-medium">
            Recenze
          </Link>
          <Link to="/admin" className="text-white transition transform duration-300 hover:scale-105 font-medium">
            Admin Edit
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">
                  {blog.title}
                </h3>
                <p className="mb-4 text-gray-700">
                  {blog.content.substring(0, 100)}...
                </p>
                <Link to={`/blog/${blog.id}`} className="text-red-600 hover:underline font-medium">
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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        <Card className="w-full">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-900">
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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 w-full px-4 py-8">
        <Card className="w-full">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-900">
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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 w-full px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Recenze</h2>
        <p className="text-lg text-gray-700">
          Připravujeme kvalitní recenze.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export function AdminLogin() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-1 w-full px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Admin Login
        </h2>
        <button className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg text-white rounded-md">
          Přihlásit se
        </button>
      </main>
      <Footer />
    </div>
  );
}
