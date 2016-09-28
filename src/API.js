import $ from 'jquery';
import ServerActions from './actions/ServerActions'

const API = {
  fetchPokemon(number) {
    $.get(`http://pokeapi.co/api/v2/pokemon/${number}`, pokemon => {
      ServerActions.receivePokemon(pokemon);
    });
  },

  fetchEmAll() {
    // console.log('fetchEmAll');
    $.get('https://pokeapi.co/api/v2/pokedex/1/', pokedex => {
      ServerActions.receivePokedex(pokedex);
    });
  }
}

export default API;
