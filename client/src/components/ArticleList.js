import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';

export default class ArticleList extends Component {
  handleClick = (e) => {
    console.log(e.target)
  }
  render() {
    const gridListStyle = {
      overflowY: 'auto',
      backgroundColor: '#dbe1e7',
      borderLeft: '2px solid gray',
      flex: '1 0 80px',
    }
    var tiles = []
    for (let i=0; i<this.props.posts.length; i++) {
      const post = this.props.posts[i]
      tiles.push(
        <GridTile
          key={i} 
          title={post.title.substr(2)}
          actionIcon={<IconButton href={`/${this.props.pageuser}/${post._id}`}>
                        <StarBorder color="white" />
                      </IconButton>}
        >
          <img src={post.img} />
        </GridTile>
      )
    }
    return(
      <GridList style={gridListStyle} cols={1}>
        <Subheader>List of Articles</Subheader>
        {tiles}
      </GridList>
    )
  }
}