import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from '../style';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  handleCommentSubmit(comment) {
    const comments = this.state.data;
    const newComment = comment;
    newComment.id = Date.now();
    const newComments = comments.concat([newComment]);
    this.setState({ data: newComments });
    axios.post(this.props.url, newComment)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        this.setState({ data: comments });
      });
  }
  loadCommentsFromServer() {
    axios.get(this.props.url)
      .then((res) => {
        this.setState({ data: res.data });
      });
  }
  render() {
    return (
      <div style={style.commentBox}>
        <h2>Comments:</h2>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  url: PropTypes.string,
  pollInterval: PropTypes.integer,
};

CommentBox.defaultProps = {
  url: null,
  pollInterval: 2000,
};

export default CommentBox;
