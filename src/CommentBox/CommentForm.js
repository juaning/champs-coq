import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) return;
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  }
  render() {
    return (
      <form style={style.commentForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name…"
          style={style.commentFormAuthor}
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something…"
          style={style.commentFormText}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type="submit"
          style={style.commentFormPost}
          value="Post"
        />
      </form>
    );
  }
}

CommentForm.propTypes = {
  onCommentSubmit: PropTypes.func,
};

CommentForm.defaultProps = {
  onCommentSubmit: () => {},
};

export default CommentForm;
