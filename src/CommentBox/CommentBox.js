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
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  loadCommentsFromServer() {
    axios.get(this.props.url)
      .then((res) => {
        this.setState({ data: res.data });
      });
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
  handleCommentDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Comment deleted');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }
  handleCommentUpdate(id, comment) {
    // Sends the comment id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, comment)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }
  render() {
    return (
      <div style={style.commentBox}>
        <h2>Comments:</h2>
        <CommentList
          onCommentDelete={this.handleCommentDelete}
          onCommentUpdate={this.handleCommentUpdate}
          data={this.state.data}
        />
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
