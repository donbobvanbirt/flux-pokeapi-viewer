import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _pokedex = null;

class PokedexStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_POKEDEX':
          _pokedex = action.payload.pokedex;
          console.log('pokedex:', _pokedex);
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

  getPokedex() {
    return _pokedex;
  }

}

export default new PokedexStore;
