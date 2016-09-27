import React, { Component } from 'react'
import PokemonActions from '../actions/PokemonActions'
import PokemonStore from '../stores/PokemonStore'

export default class Layout extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: PokemonStore.getPokemon()
    }

    this.fetchPokemon = this.fetchPokemon.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PokemonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      pokemon: PokemonStore.getPokemon()
    })

  }

  fetchPokemon() {
    let { pokemonNumber } = this.refs;
    let number = pokemonNumber.value;

    PokemonActions.fetchPokemon(number);
  }

  render() {

    const { pokemon } = this.state;
    let name = '';
    let image = '';
    let type = '';
    let weight = '';
    let height = '';

    if (pokemon) {
      name = pokemon.name;
      image = pokemon.sprites.front_default;
      weight = pokemon.weight;
      height = pokemon.height;
      if (pokemon.types[1]) {
        type = pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
      } else {
        type = pokemon.types[0].type.name;
      }
    }


    return (
      <div className='container'>
        <h1 className='text-center'>Flux Pokéapi Viewer</h1>


        <div className="row">
          <input type="number" ref='pokemonNumber'/>
          <button onClick={this.fetchPokemon} className="btn btn-default">Get Pokemon</button>
        </div>
        <div className="row">
          <table className="table">
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
                <td>{name} </td>
                <td>{type}</td>
                <td>{height}</td>
                <td>{weight}</td>
              </tr>
            </tbody>
          </table>


        </div>
      </div>
    )
  }
}
