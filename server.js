const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// const routes = require("./routes");
const PORT = 3001 || process.env.PORT;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(routes);
app.post("/submit", ({ body }, res) => {
    User.create(body)
    .then(dbUser => {
        res.json(dbUser);
    })
    .catch(err => {
        res.json(err);
    });
});

app.listen(3001, () => {
    console.log(`App running on port ${PORT}!`);
});
