import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'

export default class ArticleBody extends Component {
  render() {
    var code = ''
    if (this.props.img !== '') code += `![Img](${this.props.img})\n\n`
    code += this.props.code

    return(
      <div className="ArticleBody">
        <ReactMarkdown source={code}/>     
      </div>
    )
  }
}

ArticleBody.defaultProps = {
  code: '# Title Here',
  img: '',
}