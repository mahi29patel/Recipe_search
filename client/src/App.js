import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './recipe';
// import Register from "./components/addrecipe/addrecipe"
import NavBar from "./components/navbar/nav"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {

  const APP_ID = 'a99bd604';
  const APP_KEY = '801b3f6953e413a5d229de1043ba6dbd';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data);
    }
    getRecipes();
  }, [query]);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  //   const data = await response.json();
  //   setRecipes(data.hits);
  // }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
     <Router>
      <NavBar />

      </Router>
      <h1 className="app-title">Find Food</h1>
      <p className="app-subtitle">Search for your favourite recipe</p>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Plese enter an ingredient or a dish name" ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="reciperesults">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        url={recipe.recipe.url}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}></Recipe>
      ))}
      </div>
    </div>
  );
}

export default App;
