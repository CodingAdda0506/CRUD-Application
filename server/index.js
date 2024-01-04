const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Food = require('./models/Food');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected');
} catch (error) {
    console.log(error);
}

// Create Food
app.post('/', async (req, res) => {
    // Grab Data
    const foodName = req.body.foodName;
    const daysSinceEaten = req.body.daysSinceEaten;

    const newFood = new Food({
        foodName: foodName,
        daysSinceEaten: daysSinceEaten
    });

    try {
        await newFood.save();
        res.send("Food Saved")
    } catch (error) {
        console.log(error);
    }
});

//Read Food
app.get('/display', async (req, res) => {
    try {
        const result = await Food.find();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.put('/update/:id', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.params.id;

    try {
        const update = await Food.findById(id);

        if (!update) {
            return res.status(404).send("Food not found");
        }

        update.foodName = newFoodName;
        await update.save();

        res.send("Updated");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await Food.findByIdAndDelete(id).exec();
    res.send("Deleted");
})





app.listen(6969, () => {
    console.log('Server Running on Port 6969');
})