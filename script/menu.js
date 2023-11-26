

const apiPKM = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0";
const postContainer = document.querySelector("#posts-container");
const url = window.location.search;
const params = new URLSearchParams(window.location.search);

// Função para gerar um post Pokémon
function createPokemonPost(pokemon) {
    const post = document.createElement('div');
    post.classList.add('post');
    const img = pokemon.sprites.front_default;
    const name = pokemon.name;
    const id = pokemon.id;
    const types = pokemon.types.map(type => type.type.name);

    post.innerHTML = `
    <div class="w-72 h-auto rounded-lg border-8">

        <!--Image and id-->
        <div class="bg-black flex flex-col items-center justify-center p-3">
            <h3 class="absolute left-5 top-4 text-xl font-semibold text-white font-Poppins "> ${id}</h3>
            <img src="${img}" alt="" class="w-60">
        </div>

        <!-- Name and types -->
        <div class="bg-black flex flex-col items-center justify-center">
            <h1 class="text-center text-4xl text-white font-Pixelify-sans"> ${name} </h1>
            <div class = "flex items-center justify-between">
            ${types[0] ? `<h2 class=" text-3xl text-white font-Poppins">${types[0]}  </h2>`: ''}
            ${types[1] ? `<h2 class=" text-3xl text-white font-Poppins">  |  ${types[1]}</h2>`: ''}
            </div>
        </div>
    </div>
    `;

    return post;
}

//Main pokemons
async function displayAllPokemons(){
    
    const response = await fetch(apiPKM); //Get data
    const data = await response.json(); //Organize data to an array

    //Get each url from each pokemon and put its information on the original array
    const insideData = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json())); 
    const pokemons = await Promise.all(insideData);
    console.log(pokemons);

    pokemons.forEach(element => {
        const post = createPokemonPost(element); 
        postContainer.append(post);
    });


}

displayAllPokemons();