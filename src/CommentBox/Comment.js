import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import style from '../style';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: '',
    };
    // Binding all our functions to this class
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }
  updateComment(e) {
    e.preventDefault();
    // Brings up the update field when we click on the update link
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleCommentUpdate(e) {
    e.preventDefault();
    const id = this.props.uniqueID;
    // If author or text changed, set it. If not, leave null and our PUT
    // request will ignore it.
    const author = this.state.author ? this.state.author : null;
    const text = this.state.text ? this.state.text : null;
    const comment = { author, text };
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: '',
    });
  }
  deleteComment(e) {
    e.preventDefault();
    const id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    // eslint-disable-next-line no-console
    console.log('Oops deleted');
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  rawMarkup() {
    const rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={style.comment}>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <a role="button" style={style.updateLink} onClick={this.updateComment}>
          update
        </a>
        <a role="button" style={style.deleteLink} onClick={this.deleteComment}>
          delete
        </a>
        {
          this.state.toBeUpdated ? (
            <form onSubmit={this.handleCommentUpdate}>
              <input
                type="text"
                placeholder="Update name..."
                style={style.commentFormAuthor}
                value={this.state.author}
                onChange={this.handleAuthorChange}
              />
              <input
                type="text"
                placeholder="Update your comment..."
                style={style.commentFormPost}
                value="Update"
                onChange={this.handleTextChange}
              />
            </form>
          ) : null
        }
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
  uniqueID: PropTypes.string,
  onCommentDelete: PropTypes.func,
  onCommentUpdate: PropTypes.func,
};

Comment.defaultProps = {
  children: null,
  author: null,
  uniqueID: null,
  onCommentDelete: () => {},
  onCommentUpdate: () => {},
};

export default Comment;
