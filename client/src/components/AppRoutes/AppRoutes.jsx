
import BlogAdd from "@/BlogAdd";
import BlogPost1 from "@/components/BlogPosts/BlogPost1";
import BlogPost2 from "@/components/BlogPosts/BlogPost2";
import BlogPost3 from "@/components/BlogPosts/BlogPost3";
import BlogsPage from "@/BlogsPage";
import HomePage from "@/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/blog/pridat" element={<BlogAdd/>} />
        <Route path="/blogpost/0" element={<BlogPost1/>} />
        <Route path="/blogpost/1" element={<BlogPost2/>} />
        <Route path="/blogpost/2" element={<BlogPost3/>} />
        
      </Routes>
    </Router>
  )
}
