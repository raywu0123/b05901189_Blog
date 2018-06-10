import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import LoginForm from './LoginForm'
import AccountStatus from './AccountStatus'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const config = require('./config')

export default class Header extends Component {
  state = {
    open: false,
    blogName: '',
    blogUser: '',
  }
  componentDidMount() {
    if ('match' in this.props && !this.props.atHome && !this.props.notFound && !this.props.atEditor){
      const pageUser = this.props.match.params.pageuser
      fetch(`${config.proxy}/user/${pageUser}`, {headers: {'content-type': 'application/json'}})
      .then(res => res.json())
      .then(res => {
        if (res.length > 0)
          this.setState({blogUser: pageUser, blogName: res[0].title})
        else {
          window.location = '/NotFound'
          console.log('redirect')
        }
      })
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.atEditor && newProps.username === null && newProps.accountLoaded) {
      console.log('redirect')
      window.location = '/'
    }
  }
  handleOpen = () => {
    if (this.props.username !== null) return 
    this.setState({open: true});
  };
  handleSubmit = () => {
    this.handleClose()
    this.props.handleSubmit()
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleAddClick = () => {
    window.location = '/editor/newpost'
  }
  handleTitleClick = () => {
    if ('match' in this.props && !this.props.atHome && !this.props.notFound && !this.props.atEditor){
      const pageUser = this.props.match.params.pageuser
      window.location = `/${pageUser}`      
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];
    const addBtnStyle = {
      position: 'absolute', right: "25%", top: 100, 
      display: this.props.username === this.state.blogUser ? "block" : "none"
    }
    var title
    if (this.props.atHome) title = 'Blog - Home'
    else if (this.props.notFound) title = 'Blog - Page Not Found'
    else if (this.props.atEditor) title = 'Blog - Editor'
    else title = `${this.state.blogUser}'s blog - ${this.state.blogName}`

    const handleClick = this.props.username === null ? this.handleOpen : this.props.handleLogout
    return (
      <div className="HeadBar">
        <AppBar 
          title={title}
          titleStyle={{cursor: "pointer"}}
          onTitleClick={this.handleTitleClick}
          showMenuIconButton={false}
          iconElementRight={<AccountStatus handleClick={handleClick} username={this.props.username}/>}
        />
        <Dialog 
          title="Login"
          actions={actions}
          children={<LoginForm />}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{
            width: '50%',
          }}
        />
        <FloatingActionButton style={addBtnStyle} onClick={this.handleAddClick}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
