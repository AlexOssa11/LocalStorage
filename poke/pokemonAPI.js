async function buscarPokemon(nombre) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) {
      document.getElementById("resultado").innerHTML =
        "<p>No se encontró el Pokémon</p>";
      return;
    }

    const data = await res.json();

    const tipos = data.types.map((t) => t.type.name);
    const habilidades = data.abilities.map((h) => h.ability.name);

    // Mostrar en HTML en lugar de consola
    document.getElementById("resultado").innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Tipos:</strong> ${tipos.join(", ")}</p>
      <p><strong>Habilidades:</strong> ${habilidades.join(", ")}</p>
      <p><strong>Peso:</strong> ${data.weight} kg</p>
      <p><strong>Altura:</strong> ${data.height} m</p>
    `;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    document.getElementById("resultado").innerHTML =
      "<p>Error al obtener los datos</p>";
  }
}

// Nueva función para leer del input
function buscarPokemonDesdeInput() {
  const nombre = document
    .getElementById("nombrePokemon")
    .value.trim()
    .toLowerCase();
  if (nombre !== "") {
    buscarPokemon(nombre);
  } else {
    document.getElementById("resultado").innerHTML =
      "<p>Ingresa un nombre de Pokémon</p>";
  }
}
