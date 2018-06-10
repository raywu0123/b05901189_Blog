import React, { Component } from 'react';
import TextField from 'material-ui/TextField'

export default class LoginForm extends Component {
  render() {
    return (
      <div style={{display: "inline"}}>
        <TextField
          id="username"
          hintText="username"
          defaultValue="Alice"
        />
      </div>
    )
  }
}

