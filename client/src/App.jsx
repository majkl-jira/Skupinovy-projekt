import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, BlogPage, AboutAuthor, Reviews } from "./Pages.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/o-autorovi" element={<AboutAuthor />} />
        <Route path="/recenze" element={<Reviews />} />
      </Routes>
    </Router>
  );
}
