import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HeroesSchema = new Schema({
    team: {
        type: Array,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
})

export const Heroes = mongoose.model('Heroes', HeroesSchema)