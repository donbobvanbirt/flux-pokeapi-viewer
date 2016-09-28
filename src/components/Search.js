import React, { Component } from 'react'

import SearchActions from '../actions/SearchActions'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.enterText = this.enterText.bind(this);
  }

  enterText() {
    let text = this.refs.searchBar.value;
    SearchActions.enterText(text);
    // console.log('typing:', text)
  }

  render() {
    return (
      <div className="form-group">
        <input onChange={this.enterText} type="text" className="form-control" ref='searchBar' id='searchBar'/>
      </div>
    )
  }
}
