// Function for search.html
function handleSearchPage() {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('pokemon-result');
                resultDiv.innerHTML = `
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>Height: ${data.height}</p>
                    <p>Weight: ${data.weight}</p>
                    <a href="details.html?id=${data.id}" class="btn btn-info">View Details</a>
                `;
            })
            .catch(error => {
                document.getElementById('pokemon-result').innerHTML = '<p>Pokémon not found.</p>';
            });
    });
}

// Function for details.html
function handleDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const detailsDiv = document.getElementById('pokemon-details');
            detailsDiv.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Height: ${data.height}</p>
                <p>Weight: ${data.weight}</p>
                <h3>Abilities</h3>
                <ul>${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}</ul>
                <h3>Types</h3>
                <ul>${data.types.map(type => `<li>${type.type.name}</li>`).join('')}</ul>
                <h3>Stats</h3>
                <ul>${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}</ul>
            `;
        })
        .catch(error => {
            document.getElementById('pokemon-details').innerHTML = '<p>Pokémon details not found.</p>';
        });
}

// Determine which page is currently loaded and call the appropriate function
if (document.getElementById('search-form')) {
    handleSearchPage();
} else if (document.getElementById('pokemon-details')) {
    handleDetailsPage();
}