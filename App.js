import React from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import TodoApp from "./app/TodoApp";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import homeReducer from "./app/reducers/HomeReducer";

const store = createStore(
  combineReducers({ home: homeReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );
  }
}
