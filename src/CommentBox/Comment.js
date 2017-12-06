import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import style from '../style';

class Comment extends Component {
  rawMarkup() {
    const rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={style.comment}>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

Comment.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  author: PropTypes.string,
};

Comment.defaultProps = {
  children: null,
  author: null,
};

export default Comment;
