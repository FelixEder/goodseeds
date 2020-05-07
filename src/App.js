import React from 'react';
import './App.css';
import Router from './Router';
import getJWTToken from './api/trefleAuth';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5aab61'
    },
    secondary: {
      main: '#25523B'
    }
  }
});

function App() {
  getJWTToken();
  return (
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  );
}

export default App;
