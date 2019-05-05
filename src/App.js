import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import AppContainer from './screens/manager'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk))) //MacOs
//const store = createStore(reducers, applyMiddleware(ReduxThunk)) //Windows

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
