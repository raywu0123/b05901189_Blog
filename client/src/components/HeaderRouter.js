import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'

export default class HeaderRouter extends Component {
  render() {
    return (
      <Switch>
        <Route 
          exact path="/"
          render={() => (
          <Header 
            username={this.props.username} 
            handleSubmit={this.props.handleSubmit}
            handleLogout={this.props.handleLogout}
            accountLoaded={this.props.accountLoaded}
            atHome={true}
          />)}
        />
        <Route 
          path="/editor/:page"
          render={({match}) => (
          <Header 
            username={this.props.username} 
            handleSubmit={this.props.handleSubmit}
            handleLogout={this.props.handleLogout}
            accountLoaded={this.props.accountLoaded}            
            atEditor={true}
            match={match}
          />)}
        />  
        <Route
          exact path="/NotFound"
          render={() => (
            <Header 
              username={this.props.username} 
              handleSubmit={this.props.handleSubmit}
              handleLogout={this.props.handleLogout}
              accountLoaded={this.props.accountLoaded}            
              notFound={true}
            />)} 
        />
        <Route 
          path="/:pageuser"
          render={({match}) => (
          <Header 
            username={this.props.username} 
            handleSubmit={this.props.handleSubmit}
            handleLogout={this.props.handleLogout}
            accountLoaded={this.props.accountLoaded}            
            match={match}
          />)} 
        />
      </Switch>
    )
  }
}

