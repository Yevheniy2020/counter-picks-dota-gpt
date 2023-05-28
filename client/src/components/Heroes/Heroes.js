import {useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {getAllHeroes} from "../../http/api.js";
import HeroesList from "../HeroesList";
export default function Heroes({searchHero, connectSelectedHeroes}){

    const [allHeroes, setAllHeroes] = useState([{}]);
    const [loading, setLoading] = useState(true);

    const returnHeroes = async () =>{

        const res = await getAllHeroes();
        return res.data

    }

    const filteredHeroes = allHeroes.filter(hero =>{
        return hero.localized_name?.toLowerCase().includes(searchHero?.toLowerCase())
    })

    useEffect(()=>{
        returnHeroes().then(res => {
            setAllHeroes(res);
            setLoading(false)
        }).catch(err => {
            console.log('useEffect error, func returnHeroes')
            // console.log(err)
        })
    }, [])

    return (
        <div data-testid="heroes-component">
            {loading ?
                <CircularProgress data-testid="heroes-loading"/>
                :
                <HeroesList
                    connectSelectedHeroes={connectSelectedHeroes}
                    heroes={filteredHeroes}
                />
            }
        </div>
    );
}