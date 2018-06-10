import React, { Component } from 'react';
import ArticleView from './ArticleView'
import Editor from './Editor'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from './NotFound'
import HomePage from './HomePage'

export default class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/NotFound' component={NotFound} />
        <Route 
          path='/editor/:page' 
          render={({match}) => 
          <Editor 
            username={this.props.username} 
            accountLoaded={this.props.accountLoaded} 
            match={match}
          />} 
        />
        <Route 
          path="/:pageuser/:articleId"
          render={({match}) => (<ArticleView username={this.props.username} match={match}/>)} 
        />
        <Route 
          path="/:pageuser"
          render={({match}) => (<ArticleView username={this.props.username} match={match}/>)} 
        />
        <Route
          exact path="/"
          component={HomePage}
        />
      </Switch>
    )
  }
}

