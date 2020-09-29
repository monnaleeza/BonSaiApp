/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { store, persistor } from './store';
import { StatusBar, Text, Linking } from 'react-native';
import { BaseColor } from './config';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
