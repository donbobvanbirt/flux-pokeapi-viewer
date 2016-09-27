import API from '../API'

// recieves client actions, makes API request
const PokemonActions = {
  fetchPokemon(number) {
    API.fetchPokemon(number);
  }
}

export default PokemonActions;
