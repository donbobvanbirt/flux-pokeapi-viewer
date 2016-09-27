import $ from 'jquery';
import ServerActions from './actions/ServerActions'

const API = {
  fetchPokemon(number) {

    $.get(`http://pokeapi.co/api/v2/pokemon/${number}`, pokemon => {
      ServerActions.receivePokemon(pokemon);
      // console.log('pokemon:', pokemon);

    });
  }
}

export default API;
