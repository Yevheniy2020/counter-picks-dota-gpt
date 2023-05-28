import axios from 'axios';

export class Dota {

    URL = 'https://api.opendota.com/api/'
    // https://api.opendota.com/apps/dota2/images/dota_react/heroes/phantom_lancer.png
    getHeroesStats = async () => {
        const result = await axios.get(`${this.URL}heroStats`)
        return result.data
    }

}

