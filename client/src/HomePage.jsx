import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import BlogCard from "./components/BlogCard/BlogCard";

const blogs = [
  {
    id : 0,
    name : "Jak jsem vyhonil",
    date : "10.4.98"
  },
  {
    id : 1,
    name : "Jak jsem pokořil",
    date : "18.4.98"
  },
  {
    id : 2,
    name : "Jak jsem vyrostl",
    date : "14.4.98"
  }
]



export default function HomePage() {
  return (
    <Layout>
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="aboslute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/background.jpg"
              className="object-cover w-full h-full"
            ></img>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute px-16 max-w-xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Skibidi amerika</h1>
        </div>
      </section>
      <section className="max-w-7xl mx-auto pt-11 px-4 p-11 flex flex-col justify-center">
        <div className="text-center w-full">
          <h2 className="text-2xl md:text-4xl font-medium">Nejnovější Blogy</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Podívejte se na nejnovější příspěvky
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full p-6 gap-3">
          {blogs.map(blog => (
            <BlogCard blog={blog} key={blog.id}></BlogCard>
          ))}
        </div>
      </section>
    </Layout>
  );
}
