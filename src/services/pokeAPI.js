
const baseURL = 'https://pokeapi.co/api/v2';

async function getType() {
    const response = await fetch(`${baseURL}/type/10`);

    return response.json();
}

async function getPokemon(url) {
    const response = await fetch(url);

    return response.json();
}


export { getType, getPokemon }