
import BlogAdd from "@/components/BlogAdd/BlogAdd";
import BlogsPage from "@/BlogsPage";
import HomePage from "@/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Galerie from "@/Galerie";
import BlogDetail from "@/BlogDetail";
import BlogEdit from "../BlogEdit/BlogEdit";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/pridat" element={<BlogAdd />} />
        <Route path="/blog/edit/:id" element={<BlogEdit/>} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/galerie" element={<Galerie />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;