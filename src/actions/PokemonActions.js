import API from '../API'

// recieves client actions, makes API request
const PokemonActions = {
  fetchPokemon(number) {
    API.fetchPokemon(number);
  },

  fetchEmAll() {
    API.fetchEmAll();
  }
}

export default PokemonActions;
