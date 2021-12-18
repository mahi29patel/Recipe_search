import express from 'express'
import Recipe from '../mongodb/models/Recipe'
import mongoose from 'mongoose'
const router = express.Router()
import { body, validationResult } from 'express-validator';


router.get('/all', async (req, res) => {
    try {
        const recipies = await Recipe.aggregate([
            {
                $addFields: {
                    rating: { $avg: "$rating" }
                }
            }
        ])
        return res.status(200).json({ recipies, message: "Recipies fetched" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ recipies: [], message: "Failed to  fetch recipies" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ["$_id", mongoose.Types.ObjectId(id)]
                    }
                }
            },
            {
                $addFields: {
                    rating: { $avg: "$rating" }
                }
            }
        ])
        return res.status(200).json({ recipe, message: "Recipies fetched" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ recipe: {}, message: "Failed to  fetch recipies" })
    }
})

router.post('/add',
    body('title').isLength({ min: 5 }),
    body('ingredients').isLength({ min: 10 }),
    body('direction').isLength({ min: 10 }),
    async (req, res) => {
        const { errors } = validationResult(req);
        console.log(errors)
        if (errors.length > 0) return res.status(403).json({ recipe: null, message: "Validation failed" })

        try {
            const recipe = new Recipe(req.body)
            await recipe.save()
            return res.status(200).json({ recipe, message: "Recipies fetched" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ recipe: null, message: "Failed to  fetch recipies" })
        }
    })

router.put('/update/:id',
    async (req, res) => {

        try {
            const { id } = req.params
            const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true })
            return res.status(200).json({ recipe, message: "Recipe updated" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ recipe: null, message: "Failed to  update recipe" })
        }
    })

router.delete('/delete/:id',
    async (req, res) => {

        try {
            const { id } = req.params
            const recipe = await Recipe.findByIdAndRemove(id)
            return res.status(200).json({ recipe, message: "Recipe deleted" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ recipe: null, message: "Failed to  delete recipe" })
        }
    })

router.post('/rate/:id',
    async (req, res) => {

        try {
            const { id } = req.params
            const { rating } = req.body
            const recipeRating = Number(rating).toFixed(0)
            console.log(recipeRating)
            // if ()
            if (recipeRating > 0 && recipeRating <= 5) {
                const recipe = await Recipe.findByIdAndUpdate(id, {
                    $push: {
                        rating: recipeRating
                    }
                })
                return res.status(200).json({ message: "Recipe rated successfully" })


            } else {
                return res.status(403).json({ message: "Invalid rating value" })

            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Failed to  rate recipe" })
        }
    })

export default router
