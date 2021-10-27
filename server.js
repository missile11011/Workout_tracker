const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("express").Router();
const path = require("path");
const db = require("./models");
const { response } = require("express");
require("dotenv")
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
	useNewUrlParser: true,
});

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// app.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname,"./public/index.html"))
// });
app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname,"./public/exercise.html"))
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname,"./public/stats.html"))
});

app.use(require("./routes/index"));
app.listen(3001, () => {
	console.log(`App running on port http://localhost:${PORT}!`);
});
