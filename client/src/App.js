import React, { Component } from 'react';
import {MuiThemeProvider} from 'material-ui'
import Content from './components/Content'
import HeaderRouter from './components/HeaderRouter'
import './App.css';
import { BrowserRouter } from 'react-router-dom'

export default class App extends Component {
  state = {
    username: null,
    loaded: false,
  };
  componentDidMount() {
    var username = this.getCookie('username')
    console.log('username: ', username)
    if (username === '' ) username = null
    this.setState({username: username, loaded: true})
  }
  getCookie = (cookiename) => {
    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }
  clearCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  handleSubmit = () => {
    const username = document.getElementById('username').value
    if (username !== ''){
      console.log('submit', username)
      document.cookie = `username=${username}; Path=/;`;
      window.location.reload()    
    }
  }
  handleLogout = () => {
    console.log('logout')
    this.clearCookie("username")
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="App">
            <HeaderRouter 
              username={this.state.username}
              handleSubmit={this.handleSubmit}
              handleLogout={this.handleLogout}
              accountLoaded={this.state.loaded}
            />
            <Content 
              username={this.state.username} 
              accountLoaded={this.state.loaded}
            />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}
