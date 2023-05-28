import {ChatGPT} from "../services/chat.js";
const chat = new ChatGPT();
export const getCorrectAnswer = (req,res) =>{
    const text = req.params.text;
    chat.getAnswer(text).then(response =>{
        res.send(response)
    }).catch(err =>{
        res.status(500).json({
            message: `Error!!! ${err.message}`
        })
    })
}