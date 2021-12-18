import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/connectDB'
import recipeRoutes from './routes/recipeRoutes'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 4001

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/recipe', recipeRoutes)

app.get('/', (req, res) => {
    res.send(`Recipe APP server listening at PORT: ${port} `)
})


app.listen(port, () => {
    console.log(`Server listening at PORT ${port}`)
})