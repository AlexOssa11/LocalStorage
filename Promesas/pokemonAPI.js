async function buscarPokemon(nombre) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!res.ok) {
      console.log('No se encontró el Pokémon');
      return;
    }

    const data = await res.json();

    console.log('Nombre:', data.name);
    console.log('ID:', data.id);
    console.log('Foto frontal:', data.sprites.front_default);

    const tipos = data.types.map(t => t.type.name);
    console.log('Tipos:', tipos.join(', '));

    const habilidades = data.abilities.map(h => h.ability.name);
    console.log('Habilidades:', habilidades.join(', '));

    console.log('Peso:', data.weight);
    console.log('Altura:', data.height);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

buscarPokemon('palkia');

