import {Dota} from '../services/dota.js'
const dota = new Dota();

export const getHeroesStats = (req, res) => {
    dota.getHeroesStats().then(response =>{
        res.json(response)
    }).catch(err =>{
        res.status(500).json({
            message: `Error!!! ${err.message}`
        })
    })
}

export const getHeroStatsById = async (req, res) => {
    const heroId = +req.params.id;
    let result = 'Not found hero by id!!!'
    await dota.getHeroesStats().then(response =>{

        response.forEach(hero => hero.id === heroId ? result = hero : undefined)
        res.json(result)
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            message: `Error!!! ${err.message}`
        })
    })

}

