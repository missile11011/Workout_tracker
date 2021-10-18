const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("express").Router();
const path = require("path");
const db = require("./models");
const { response } = require("express");
require("dotenv")
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wokrout", {
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

app.get("/api/workouts", (req,res) =>{
	db.Workout.find({})
	.then(data =>{
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	})
})
app.post("/api/workouts",({ body },res) => {
	db.Workout.create(body)
	.then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
        res.json(dbUser);
    })
    .catch(err => {
        res.json(err);
    });
})
app.put("api/workout/:id",({params}, res) => {
	db.Workout.update(
		{
			_id: mongojs.ObjectId(params.id)
		},
		{
			$set: {
				read: false
			}
		},
		(error, edited) => {
			if (error) {
				console.log(error);
				res.send(error);
			} else {
				console.log(edited);
				res.send(edited);
			}
		}
	)
})

app.listen(3001, () => {
	console.log(`App running on port ${PORT}!`);
});
