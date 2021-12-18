import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    ingredients: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    rating: [{ type: Number }]
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe