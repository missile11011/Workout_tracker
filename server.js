const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("express").Router();
const path = require("path");
const Workout = require("./models/workoutModel");
const { response } = require("express");

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", {
	useNewUrlParser: true,
});

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"./public/index.html"))
});
app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname,"./public/exercise.html"))
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname,"./public/stats.html"))
});

router.put("/api/workouts", (req,res) =>{
	Workout.update({
		type: req.body.type,
		name: req.body.name,
		duration: req.body.duration,
		weight: req.body.weight,
		reps: req.body.reps,
		sets: req.body.sets
	},
	{
		where:{_id: req.body._id}
	})
	.then((update)=>{
		res.json(update)
	})
})

app.listen(3001, () => {
	console.log(`App running on port ${PORT}!`);
});
