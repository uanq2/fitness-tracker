// new mongoose schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// day: { type: date, default: Now}
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        duration: {
            type: Number
        },
        distance: {
            type: Number
        },
    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;