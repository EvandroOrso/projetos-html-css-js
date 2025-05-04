// Elements
const searchBtn = document.getElementById("searchBtn");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonId = document.getElementById("pokemonId");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const buttonSection = document.querySelector(".buttonSection");
const circleBackground = document.querySelector(".circleBackground");
const pokemonImg = document.getElementById("pokemonImg");
const pokemonName = document.getElementById("pokemonName");
const pokemonTypeSection = document.querySelector(".pokemonTypeSection");
const hpValue = document.getElementById("hpValue");
const attackValue = document.getElementById("attackValue");
const defenseValue = document.getElementById("defenseValue");
const spcAttackValue = document.getElementById("spcAttackValue");
const spcDefenseValue = document.getElementById("spcDefenseValue");
const speedValue = document.getElementById("speedValue");

// Data
let currentPokemonId = 1;
let maxPokemonId = 1025; /* Max pokemon id from data 03/05/2025*/

// Adding Event Listener
window.addEventListener("DOMContentLoaded", async () => {
    const data = await returnPokemonAPIData("bulbasaur");
    pokemonImg.src = data.sprites.front_default;
    pokemonImg.alt = `${data.name} Image`;
    console.log(currentPokemonId);
});

searchBtn.addEventListener("click", async () => {
    if(pokemonInput.value.trim() === "") return;

    const pokemonData = await returnPokemonAPIData(pokemonInput.value.trim().toLowerCase());
    updatePokemon(pokemonData);
    currentPokemonId = pokemonData.id;
    console.log(currentPokemonId);
});

prevBtn.addEventListener("click", async () => {
    currentPokemonId = currentPokemonId <= 1 ? maxPokemonId : --currentPokemonId;
    console.log(currentPokemonId);

    const data = await returnPokemonAPIData(currentPokemonId);
    updatePokemon(data);
});

nextBtn.addEventListener("click", async () => {
    currentPokemonId = currentPokemonId >= maxPokemonId ? 1 : ++currentPokemonId;
    console.log(currentPokemonId);

    const data = await returnPokemonAPIData(currentPokemonId);
    updatePokemon(data);
});

// Functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function returnPokemonAPIData(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error while fetching API data");
        }
    } catch (error) {
        console.error(`Sorry, there was an unexpected error: ${error}`)
    }
};

function updatePokemon(pokemonData) {
    pokemonImg.src = pokemonData.sprites.front_default;
    pokemonImg.alt = `${pokemonData.name} Image`;

    pokemonId.textContent = `#${pokemonData.id}`;
    pokemonName.textContent = capitalizeFirstLetter(pokemonData.name);

    pokemonTypeSection.innerHTML = "";
    pokemonData.types.forEach(type => {
        const element = document.createElement("p");
        element.innerText = capitalizeFirstLetter(type.type.name);
        element.style.backgroundColor = getTypeColor(element.innerText);
        pokemonTypeSection.appendChild(element);
    });

    const primaryType = pokemonData.types[0].type.name;
    const typeColor = getTypeColor(primaryType);
    buttonSection.style.backgroundColor = typeColor;
    circleBackground.style.backgroundColor = typeColor;

    hpValue.textContent = pokemonData.stats[0].base_stat;
    attackValue.textContent = pokemonData.stats[1].base_stat;
    defenseValue.textContent = pokemonData.stats[2].base_stat;
    spcAttackValue.textContent = pokemonData.stats[3].base_stat;
    spcDefenseValue.textContent = pokemonData.stats[4].base_stat;
    speedValue.textContent = pokemonData.stats[5].base_stat;
};

function getTypeColor(typeName) {
    switch(typeName.toLowerCase()) {
        case "normal": return "#A8A878";
        case "fire": return "#F08030";
        case "water": return "#6890F0";
        case "electric": return "#F8D030";
        case "grass": return "#78C850";
        case "ice": return "#98D8D8";
        case "fighting": return "#C03028";
        case "poison": return "#A040A0";
        case "ground": return "#E0C068";
        case "flying": return "#A890F0";
        case "psychic": return "#F85888";
        case "bug": return "#A8B820";
        case "rock": return "#B8A038";
        case "ghost": return "#705898";
        case "dragon": return "#7038F8";
        case "dark": return "#705848";
        case "steel": return "#B8B8D0";
        case "fairy": return "#F0B6BC";
        case "stellar": return "#35ACE7";
        default: return "#777";
    }
}