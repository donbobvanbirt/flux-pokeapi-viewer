import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receivePokemon(pokemon) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_POKEMON',
      payload: { pokemon }
    })
    console.log(pokemon);
  }
}

export default ServerActions;
