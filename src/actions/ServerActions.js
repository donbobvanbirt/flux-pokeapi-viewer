import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receivePokemon(pokemon) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_POKEMON',
      payload: { pokemon }
    })
    // console.log(pokemon);
  },

  receivePokedex(pokedex) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_POKEDEX',
      payload: { pokedex }
    })
  }
}

export default ServerActions;
