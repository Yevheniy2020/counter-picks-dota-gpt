import express from 'express'
import {getHeroesStats, getHeroStatsById} from './controllers/DotaController.js'
import {getCorrectAnswer} from "./controllers/ChatController.js";
import {allowCrossDomain} from './middlewares/domain.js'
import {postHeroes, getHeroes} from "./controllers/MongoDB.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(allowCrossDomain);
app.use(express.json());
app.get('/heroes',getHeroesStats)
app.get('/hero/:id',getHeroStatsById)
app.get('/chat/:text',getCorrectAnswer)
app.post('/add-team',postHeroes)
app.get('/get-team',getHeroes)

app.listen(PORT, ()=>{
    console.log('Server started')
})