
import BlogAdd from "@/BlogAdd";
import BlogPost1 from "@/components/BlogPosts/BlogPost1";
import BlogsPage from "@/BlogsPage";
import HomePage from "@/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Galerie from "@/Galerie";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/blog/pridat" element={<BlogAdd/>} />
        <Route path="/blogpost/:id" element={<BlogPost1/>} />  
        <Route path="/galerie" element={<Galerie/>} />  
      </Routes>
    </Router>
  )
}
