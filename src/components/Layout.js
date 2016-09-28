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
    // let { pokemonNumber } = this.refs;
    // let number = pokemonNumber.value;

    PokemonActions.fetchPokemon(number);
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

    let pokemonList = (
      <tr>
        <td>Loding Pokemon...</td>
      </tr>
    );

    if (pokemon) {
      name = pokemon.name;
      image = pokemon.sprites.front_default;
      weight = pokemon.weight;
      height = pokemon.height;
      hp = pokemon.stats[5].base_stat;
      attack = pokemon.stats[4].base_stat;
      defence = pokemon.stats[3].base_stat;
      speed = pokemon.stats[0].base_stat;

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
          <button key={num} onClick={() => this.fetchPokemon(num)} className="btn btn-default"><img src={imageUrl} alt= {name}/></button>
        )
      })
    }

    return (
      <div className='container'>
        <h1 className='text-center'>Flux Pokéapi Viewer</h1>


        {/* <div className="row">
          <input type="number" ref='pokemonNumber'/>
          <button onClick={this.fetchPokemon} className="btn btn-default">Get Pokemon</button>
        </div> */}
        <div className="row">
          {/* <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Height</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={image} alt= {name}/></td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{height}</td>
                <td>{weight}</td>
              </tr>
            </tbody>
          </table> */}

          <h2>{name}</h2>
          <img src={image} alt= {name}/>
          <ul>
            <li>HP: {hp}</li>
            <li>Speed: {speed}</li>
            <li>Attack: {attack}</li>
            <li>Defence: {defence}</li>
            <li>Type: {type}</li>
            <li>Height: {height}</li>
            <li>Weight: {weight}</li>
          </ul>
        </div>
        <hr/>

        {pokemonList}

      </div>
    )
  }
}
