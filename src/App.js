import React, {Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeObject from './util/theme';
import jwtDecode from 'jwt-decode'
// component
import Navbar from './components/navbar'
import AuthRoute from './util/AuthRoute'

// pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme(themeObject);

let authenticated; 

const token = localStorage.FBIdToken;

if(token) {
   const decodedToken =jwtDecode(token);
   console.log(decodedToken);
   if(decodedToken.exp *1000<Date.now()){
     window.location.href='/login'
     authenticated = false;
   } else {
     authenticated =true;
   }
}

class App extends Component {
  render(){
    return (
      <div className="App">
      
      <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar/>
         <div className="container">
         <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
          <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
         </Switch>
           </div>
         </Router>
      </MuiThemeProvider>
      
      
      
      </div>
    );
  }
  
}

export default App;
