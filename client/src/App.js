import Recipes from "./components/Recipes";
import Navbar from "./layout/Navbar";
import { Routes, Route } from 'react-router-dom'
import Recipe from "./components/Recipe";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState('')

  const pth = window.location.host.includes('localhost') ? '/' : '/recipe/client/'

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar setSearch={setSearch} />

      <Routes>
        <Route path={pth} element={<Recipes search={search} />} />
        <Route path={`${pth}/recipe/:id`} element={<Recipe />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;