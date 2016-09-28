import AppDispatcher from '../AppDispatcher'

const SearchActions = {
  enterText(text) {
    AppDispatcher.dispatch({
      type: 'ENTER_TEXT',
      payload: { text }
    })
    // console.log('typing:', text)
  }
}

export default SearchActions;
