import {$host} from "./index.mjs";

export const getAllHeroes = async () =>{
    const response = await $host.get('heroes');
    return response;
}

export const getHeroById = async (id) =>{
    const response = await $host.get(`hero/${id}`);
    return response;
}

export const sendChatGPT  = async (text) =>{
    const response = await $host.get(`chat/${text}`);
    return response;
}

export const postTeams  = async (team, answer) =>{
    const response = await $host.post(`add-team`, {team, answer});
    return response;
}

export const getTeams  = async () =>{
    const response = await $host.get(`get-team`, );
    return response;
}