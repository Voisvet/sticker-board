import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';

import * as reducers from './store/reducers';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7bddff',
      main: '#3eabe3',
      dark: '#007cb1',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff8890',
      main: '#e85663',
      dark: '#b01f39',
      contrastText: '#7f0000'
    },
    // error: will use the default color
    typography: {
      useNextVariants: true
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
