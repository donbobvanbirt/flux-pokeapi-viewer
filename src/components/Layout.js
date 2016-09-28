import React, { Component } from 'react'
import PokemonActions from '../actions/PokemonActions'
import PokemonStore from '../stores/PokemonStore'
import PokedexStore from '../stores/PokedexStore'

export default class Layout extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: PokemonStore.getPokemon(),
      pokedex: PokedexStore.getPokedex()
    }

    this.fetchPokemon = this.fetchPokemon.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PokemonActions.fetchEmAll();
    PokemonStore.startListening(this._onChange);
    PokedexStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.stopListening(this._onChange);
    PokedexStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      pokemon: PokemonStore.getPokemon(),
      pokedex: PokedexStore.getPokedex()
    })
    console.log('state', this.state);
  }

  fetchPokemon(number) {
    PokemonActions.fetchPokemon(number);
  }

  clearModal() {
    // name = '';
    // image = '';
    // type = '';
    // weight = '';
    // height = '';
    // hp = '';
    // attack = '';
    // defence = '';
    // speed = '';
    console.log('modal cleared');
  }

  render() {

    const { pokemon, pokedex } = this.state;

    let name = '';
    let image = '';
    let type = '';
    let weight = '';
    let height = '';
    let hp = '';
    let attack = '';
    let defence = '';
    let speed = '';
    let specialDefence = '';
    let specialAttack = '';
    let abilities = '';

    let pokemonList = (
        <h5>Loding Pokemon...</h5>
    );

    if (pokemon) {
      name = pokemon.name;
      image = pokemon.sprites.front_default;
      weight = pokemon.weight;
      height = pokemon.height;
      hp = pokemon.stats[5].base_stat;
      attack = pokemon.stats[4].base_stat;
      defence = pokemon.stats[3].base_stat;
      specialAttack = pokemon.stats[2].base_stat;
      specialDefence = pokemon.stats[1].base_stat;
      speed = pokemon.stats[0].base_stat;

      pokemon.abilities.forEach(abil => {
        abilities += `${abil.ability.name}, `;
      });

      if (pokemon.types[1]) {
        type = pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
      } else {
        type = pokemon.types[0].type.name;
      }
    }

    if (pokedex) {
      pokemonList = pokedex.pokemon_entries.map(pokemon => {
        let { name } = pokemon.pokemon_species;
        let num = pokemon.entry_number;
        let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`
        return (
          <button key={num} onClick={() => this.fetchPokemon(num)} data-toggle="modal" data-target="#myModal" className="btn btn-default"><img src={imageUrl} alt= {name}/></button>
        )
      })
    }

    return (
      <div className='container'>
        <h1 className='text-center'>Flux Pokéapi Viewer</h1>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.clearModal} data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{name}</h4>
              </div>
              <div className="modal-body">

                <img src={image} alt= {name}/>
                <ul>
                  <li>Type: {type}</li>
                  <li>HP: {hp}</li>
                  <li>Speed: {speed}</li>
                  <li>Attack: {attack}</li>
                  <li>Defence: {defence}</li>
                  <li>Special Attack: {specialAttack}</li>
                  <li>Special Defence: {specialDefence}</li>
                  <li>Height: {height}</li>
                  <li>Weight: {weight}</li>
                  <li>Abilities: {abilities}</li>
                </ul>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.clearModal} data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>

        <hr/>

        {pokemonList}

      </div>
    )
  }
}
