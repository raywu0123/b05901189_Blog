import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class AccountStatus extends Component {
  handleClick = () => {
    window.location = `/${this.props.username}`
  }
  render() {
    const btnStyle = {
      color: "white",
      marginBottom: 2,
    }
    const label = this.props.username === null ? "Login" : "Logout"
    return (
      <div className="AccountStatus">
        <div className="Account">
          <div className="Name" onClick={this.handleClick}>
            {this.props.username}
          </div>  
        </div>
        <FlatButton label={label} style={btnStyle} onClick={this.props.handleClick}/>
      </div>
    )
  }
}