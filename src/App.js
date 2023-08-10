import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages

import HomePage from "./pages/HomePage";
import CreateEmployee from "./pages/CreateEmployee";
import CurrentEmployees from "./pages/CurrentEmployees";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
        <Route path="/currentemployees" element={<CurrentEmployees />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
