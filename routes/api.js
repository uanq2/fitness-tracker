const router = require("express").Router();
const Workout = require("../models/Workout.js")

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    Workout.create({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        { $addFields: { totalDuration: { $sum: `$exercises.duration` } } },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => res.json(err));
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete((body.id), (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;