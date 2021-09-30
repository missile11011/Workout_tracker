const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    date:{ 
        type: Date, 
        default: Date.now
    },
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

const Workout = mongoose.model("User", UserSchema);

module.exports = Workout;