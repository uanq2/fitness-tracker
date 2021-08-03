// view
// router.get('/exercise')
// router.get('/stats')
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
})
// api
// router.post('api/workouts')workout.create({})
// router.put('/api/workouts/:id') pushing exercise into array of workout
// router.get('/api/workouts') get all workouts
// router.get('/api/workouts/range') last 7 combined weights, last 7 combined duration