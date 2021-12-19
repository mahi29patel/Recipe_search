import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Edit from './Edit';
import Recipe1 from './Recipe1';
import Navbar from '../layout/Navbar';

const Recipes = ({search}) => {

//  const APP_ID = 'a99bd604';
//   const APP_KEY = '801b3f6953e413a5d229de1043ba6dbd';

//   const [recipes, setRecipes] = useState([]);
//   const [search1, setSearch] = useState('');
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     const getRecipes = async () => {
//       const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//       const data = await response.json();
//       setRecipes(data.hits);
//       console.log(data);
//     }
//     getRecipes();
//   }, [query]);

//   // const getRecipes = async () => {
//   //   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//   //   const data = await response.json();
//   //   setRecipes(data.hits);
//   // }

//   const updateSearch = e => {
//     setSearch(e.target.value);
//   }

//   const getSearch = e => {
//     e.preventDefault();
//     setQuery(search1);
//     setSearch('');
//   }

    const [recipies, setRecipies] = useState([])
    const [loading, setloading] = useState(false)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        const regExp = RegExp(search, "i")

        setDisplay((recipies && recipies.filter(recipe => regExp.test(recipe.title))))
    }, [search])


    const getRecipes = async () => {
        setloading(true)
        const res = await axios.get('https://dt-recipe-api.herokuapp.com/api/recipe/all')
        console.log(res.data)
        const { recipies } = res.data
        setRecipies(recipies)
        setDisplay(recipies)
        setloading(false)
    }

    const handleDelete = async (id) => {
        try {

            const res = await axios.delete(`https://dt-recipe-api.herokuapp.com/api/recipe/delete/${id}`)
            const { recipe } = res.data
            if (recipe) {
                setRecipies(prev => prev.filter(recipe => recipe._id !== id))
                setDisplay(prev => prev.filter(recipe => recipe._id !== id))
                toast.success("Recipe deleted successfully")
            } else {
                toast.error("Failed to delete recipe")

            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete recipe")
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])


    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                {loading ? "Loading..." : <div class="flex flex-wrap -m-4">
                    {display.length == 0 ? "No recipies found" : display && display.map(recipe => {
                        
                        return (
                            
                            <div class="p-4 md:w-1/3">

                                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={recipe.img} alt="blog"></img>
                                    <div class="p-6">
                                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{recipe.category} </h2>
                                        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{recipe.title} ({recipe.rating == null ? '4⭐️' : `${recipe.rating.toFixed(0)}⭐️`})</h1>
                                        <p class="leading-relaxed mb-3">{recipe.description.substring(0, 80)}...</p>
                                        <div style={{ justifyContent: "space-between" }} class="flex flex-wrap ">
                                            <Link to={`/recipe/${recipe._id}`} class="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">Read More
                                                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </Link>

                                            <div style={{ display: 'flex' }} >
                                                <Edit recipe={recipe} />
                                                {/* <a onClick={() => { handleDelete(recipe._id) }} class="text-gray-400 inline-flex items-center leading-none text-sm">
                                                    <AiOutlineDelete color={'crimson'} size={20} />
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>}
            </div>

        </section>
    );
}

export default Recipes;