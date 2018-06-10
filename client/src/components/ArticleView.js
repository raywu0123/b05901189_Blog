import React, { Component } from 'react';
import ArticleList from './ArticleList'
import ArticleBody from './ArticleBody'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/image/edit'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
const config = require('./config')

export default class ArticelView extends Component {
  state = {posts: [], code: '', img: '', atUserHome: false, pageFound: false}
  componentDidMount() {
    const articleId = this.props.match.params.articleId   
    this.getPosts()
  }
  getPosts = async () => {
    const pageUser = this.props.match.params.pageuser
    const res = await fetch(`${config.proxy}/posts/${pageUser}`, {headers: {'content-type': 'application/json'}})
    const body = await res.json()
    this.setCode(body)
    this.setState({posts: body})
  }
  getHomeInfo = async () => {
    const pageUser = this.props.match.params.pageuser    
    const res = await fetch(`${config.proxy}/user/${pageUser}`, {headers: {'content-type': 'application/json'}})
    const body = await res.json()
    if (body.length > 0){
      return {homeInfo: body[0].homeInfo, homeImg: body[0].homeImg}
    } else {
      return new Promise((res, rej) => {
        res('# User Not Found')
      })
    }
  }
  setCode = (body) => {
    const articleId = this.props.match.params.articleId
    let code = '# Article Not Found'
    let img = ''
    if (articleId !== undefined) {
      for (let i=0; i<body.length; i++) {
        if (body[i]._id === articleId) {
          code = body[i].title + '\n' + body[i].body 
          img = body[i].img
          this.setState({pageFound: true})
          break
        }
      }
      this.setState({code: code, img: img,})
    } else {
      this.getHomeInfo().then(res => {
        this.setState({code: res.homeInfo, img: res.homeImg, atUserHome: true, pageFound: true})
      })
    }
  }
  handleEditClick = () => {
    if (this.state.atUserHome) {
      window.location = '/editor/homepage'
    } else {
      window.location = `/editor/${this.props.match.params.articleId }`
    }
  }
  handleDeleteClick = () => {
    console.log('del')
    const pageUser = this.props.match.params.pageuser    
    fetch(`${config.proxy}/post/${this.props.match.params.articleId}`, {method: "DELETE"})
    .then (res => {
      if (res.ok) window.location = `/${this.props.username}`
    })
  }
  render() {
    const pageUser = this.props.match.params.pageuser    
    const editable = pageUser === this.props.username && this.state.pageFound ? "block" : "none"
    const deletable = pageUser === this.props.username && this.state.pageFound && !this.state.atUserHome ? "block" : "none"
    const editBtnStyle = {position: "absolute", right: "25%", top: "180px", display: editable}
    const deleteBtnStyle = {position: "absolute", right: "25%", top: "260px", display: deletable}
    return (
      <div className="Content">
        <ArticleBody code={this.state.code} img={this.state.img}/>
        <ArticleList posts={this.state.posts} pageuser={pageUser}/>

        <FloatingActionButton style={editBtnStyle} onClick={this.handleEditClick}>
          <EditIcon />
        </FloatingActionButton>
        <FloatingActionButton style={deleteBtnStyle} onClick={this.handleDeleteClick}>
          <DeleteIcon />
        </FloatingActionButton>
      </div>
    )
  }
}

