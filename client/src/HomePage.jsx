import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./components/Layout/Layout";
import BlogCard from "./components/BlogCard/BlogCard";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        const sortedBlogs = response.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Chyba při načítání blogů:", error);
        setError("Nepodařilo se načíst blogy.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <Layout>
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/images/background1.jpeg"
              className="object-cover w-full h-full"
              alt="Hero background - USA skyline"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute px-16 max-w-xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold">
            Blog o Studiu v Americe
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Sledujte mou cestu americkým vzdělávacím systémem - zkušenosti, tipy
            a zážitky
          </p>
        </div>
      </section>
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img
                src="/images/profile.jpg"
                alt="Profilová fotka"
                className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-2 border-white"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">O mně</h2>
              <p className="text-lg mb-4">
                Ahoj! Jmenuji se Michal a jsem student z České republiky, který
                se rozhodl vydat na studijní cestu do Spojených států. Na Grand
                Island Senior High School v Nebrasce studuji již druhým rokem a
                rád bych se s vámi podělil o své zkušenosti.
              </p>
              <p className="text-lg mb-4">
                Na tomto blogu najdete mé postřehy z amerického vzdělávacího
                systému, kulturních rozdílů a každodenního života v USA. Doufám,
                že mé zkušenosti pomohou dalším studentům, kteří uvažují o
                studiu v zahraničí.
              </p>
              <div className="flex items-center text-gray-300">
                <MapPin size={20} className="mr-2" />
                <span>Grand Island, Nebraska, USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center w-full mb-8">
            <h2 className="text-2xl md:text-4xl font-medium">
              Nejnovější Blogy
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Podívejte se na nejnovější příspěvky
            </p>
          </div>
          {isLoading ? (
            <div className="text-center">Načítám blogy...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center">Zatím zde nejsou žádné blogy.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/blogs">
              <Button variant="outline">Zobrazit všechny blogy</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Často kladené otázky
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">
                Jak těžké je získat studentské vízum do USA?
              </h3>
              <p className="text-gray-300">
                Proces získání studentského víza zahrnuje několik kroků včetně
                přijetí na školu, získání formuláře I-20, zaplacení SEVIS
                poplatku a absolvování pohovoru na ambasádě. Je důležité začít s
                procesem několik měsíců předem.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">
                Kolik stojí studium v USA?
              </h3>
              <p className="text-gray-300">
              Náklady na studim se mohou lišit záleží jestli pojedete na sokourkomou střední školu nebo na veřejnou za kterou nic neplatíte ale můj pobyt stál něco okolo 25 000$
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">
                Mohu při studiu v USA pracovat?
              </h3>
              <p className="text-gray-300">
              S studiním vízem J-1 nemůžete pracovat toto vízum je totoiž pouze určeno pro studium nikooliv pro práci proto doporučuji si našetřit peníze před odjezdem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
