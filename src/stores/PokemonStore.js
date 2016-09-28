import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _pokemon = null;
let searchField = '';

class PokemonStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_POKEMON':
          _pokemon = action.payload.pokemon;
          this.emit('CHANGE');
          break;
        case 'ENTER_TEXT':
          searchField = action.payload.text;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getPokemon() {
    return _pokemon;
  }

  getSearch() {
    return searchField;
  }

}

export default new PokemonStore();
