import mongoose from "mongoose";
import {Heroes} from '../models/heroes.js'

const URL = "mongodb+srv://duder2019:3k3PGSpiZxUwLayW@cluster0.obkkncb.mongodb.net/dotaDB";

mongoose
    .connect(URL)
    .then(res =>{
        console.log('Connect to DB')})
    .catch(err => console.log(err))


export const postHeroes = (req, res) => {
    const {team, answer} = req.body;
    const heroes = new Heroes({team, answer});
    heroes
        .save()
        .then(result => res.send(result))
        .catch(err => console.log(err))
}


export const getHeroes = (req, res) => {
    Heroes
        .find()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
}