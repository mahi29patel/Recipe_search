import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Timeline from "./Timeline";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

const Recipe = () => {
    const [recipe, setRecipe] = useState(null)
    const [selected, setSelected] = useState('description')
    const { id } = useParams()

    const getRecipe = async () => {
        const res = await axios.get(`https://dt-recipe-api.herokuapp.com/api/recipe/${id}`)

        const { recipe } = res.data
        setRecipe(recipe[0])
    }

    useEffect(() => {
        getRecipe()
        return () => setRecipe(null)
    }, [])

    console.log(recipe)

    const handleRate = async (rating) => {
        try {
            const res = await axios.post(`https://dt-recipe-api.herokuapp.com/api/recipe/rate/${id}`, {
                rating: rating
            })
            toast.success('Successfully rated recipe!')
            console.log(res.data)
        } catch (error) {
            toast.error('Failed to rate recipe!')
            console.log(error)
        }
    }

    return (
        <section style={{ minHeight: "80vh" }} class="text-gray-600 body-font overflow-hidden">
            {recipe == null ? "Loading...." : <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-full mx-auto flex flex-wrap">
                    <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 class="text-sm title-font text-gray-500 tracking-widest">{recipe.category} </h2>
                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4 flex">{recipe.title} {' '} ({recipe.rating == null ? '4⭐️' : `${recipe.rating.toFixed(0)}⭐️`}) </h1>
                        <div class="flex mb-4">
                            <a onClick={() => { setSelected('description') }} class={`flex-grow text-${selected == "description" ? 'blue' : "gray"}-500 border-b-2 border-${selected == "description" ? 'blue' : "gray"}-300 py-2 text-lg px-1`}>Description</a>
                            <a onClick={() => { setSelected('steps') }} class={`flex-grow border-b-2  text-${selected != "description" ? 'blue' : "gray"}-500 border-${selected != "description" ? 'blue' : "gray"}-300 py-2 text-lg px-1`}>Directions</a>
                            <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                                <ReactStars
                                    onChange={handleRate}
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </a>
                        </div>
                        <div class="leading-relaxed mb-4">
                            {
                                selected == "description" ? recipe.description : <Timeline directions={recipe.directions} />
                            }
                        </div>

                    </div>
                    <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={recipe.img}></img>
                </div>
            </div>}
        </section>
    );
}

export default Recipe;