import React, { Component } from 'react';
import ArticleBody from './ArticleBody'
import CodeMirror from 'react-codemirror'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import TextField from 'material-ui/TextField';
import IconDiscard from 'material-ui/svg-icons/content/clear'
import IconPost from 'material-ui/svg-icons/content/add'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/rubyblue.css'
const config = require('./config')

const discardIcon = <IconDiscard />
const postIcon = <IconPost />

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '# Title Here\n---\n[//]: (please_keep_this_title_format)',
      mouseInitPos: null,
      cmInitWidth: null,
      cmWidth: 400,
      imgURL: "",
      mode: null,
    }
    this.codemirrorRef = React.createRef()
    this.handleDrag = this.handleDrag.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    window.addEventListener('mouseup', this.handleMouseUp)    
  }
  componentDidMount() {
    const cm = this.codemirrorRef.current.getCodeMirror();
    cm.setSize(this.state.cmWidth, null)
    this.setState({mode: this.props.match.params.page})    
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.accountLoaded && this.props.accountLoaded && this.state.mode !== 'newpost') this.initCode()
  }
  initCode = () => {
    console.log(this.props.accountLoaded, this.props.username, this.state.mode)
    const append = this.state.mode === 'homepage' ? `:${this.props.username}` : ''
    fetch(`${config.proxy}/post/${this.state.mode}${append}`)
    .then(res => res.json())
    .catch(rej => {window.location = `/${this.props.username}`})
    .then(res => {
      console.log(res)
      const code = res.title +'\n'+ res.body
      const cm = this.codemirrorRef.current.getCodeMirror();
      cm.setValue(code)
      this.setState({code: code, imgURL: res.img})
    })
  }
	updateCode = (newCode) => {
		this.setState({
			code: newCode,
		});
  }
  handleMouseDown = (e) => {
    this.setState({
      mouseInitPos: e.clientX,
      cmInitWidth: this.state.cmWidth,
    })
    window.addEventListener('mousemove', this.handleDrag)
    document.body.style.cursor = 'ew-resize'
  }
  handleMouseUp(e) {
    window.removeEventListener('mousemove', this.handleDrag)
    document.body.style.cursor = 'default'    
  }
  handleDrag(e){
    const cm = this.codemirrorRef.current.getCodeMirror();
    this.setState({cmWidth: this.state.cmInitWidth + e.clientX - this.state.mouseInitPos})
    cm.setSize(this.state.cmInitWidth + e.clientX - this.state.mouseInitPos, null)    
  }
  handleURLChange = (e) => {
    this.setState({imgURL: e.target.value})
  }
  handleDiscard = () => {
    window.location = `/${this.props.username}`
  }
  handlePost = async () => {
    const post = this.parseCode()
    if (!this.checkFormat(post)) return;
    await fetch(`${config.proxy}/post`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      if (res.ok)
        window.location = `/${this.props.username}`
    })
  }
  parseCode = () => {
    const arr = this.state.code.split(/\r?\n/)
    var title = arr[0]
    var body = arr.slice(1).join('\n')
    
    return {
      author: this.props.username, 
      title: title, 
      body: body, 
      img: this.state.imgURL, 
      time: Date(),
      mode: this.state.mode,
    }
  }
  checkFormat = (post) => {
    if (post.title.slice(0, 2) !== '# ') {
      alert('[Error] Incorrect Tile Format')
      return false
    }
    return true
  }
  render() {
    const options = {
      mode: "markdown",
      theme: "rubyblue",
      lineNumbers: true,
    }
    return (
      <div className="Editor">
        <div className="Content" >
          <CodeMirror 
            value={this.state.code}
            onChange={this.updateCode} 
            options={options}
            autoFocus={true}
            ref={this.codemirrorRef}
          />
          <div 
            className="dragArea"  
            onMouseDown={this.handleMouseDown}
          ></div>
          <ArticleBody code={this.state.code} img={this.state.imgURL}/>
        </div>

        <BottomNavigation >
          <TextField 
            hintText="image url"           
            onChange={this.handleURLChange}
            value={this.state.imgURL}
            style={{marginLeft: 50}}
          />
          <BottomNavigationItem
            label="Discard"
            icon={discardIcon}
            onClick={this.handleDiscard}            
          />
          <BottomNavigationItem
            label="Post"
            icon={postIcon}
            style={{marginRight: 50}}
            onClick={this.handlePost}
          />
        </BottomNavigation>
      </div>
    )
  }
}

