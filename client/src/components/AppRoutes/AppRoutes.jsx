
import BlogAdd from "@/BlogAdd";
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
      </Routes>
    </Router>
  )
}
