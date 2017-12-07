import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import style from '../style';

const CommentList = ({ data, onCommentDelete, onCommentUpdate }) => {
  const commentNodes = data.map((comment) => {
    const { _id, author, text } = comment;
    return (
      <Comment
        author={author}
        uniqueID={_id}
        onCommentDelete={onCommentDelete}
        onCommentUpdate={onCommentUpdate}
        key={_id}
      >
        {text}
      </Comment>
    );
  });
  return (
    <div style={style.commentList}>
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.number,
    author: PropTypes.string,
    text: PropTypes.string,
  }),
  onCommentDelete: PropTypes.func,
  onCommentUpdate: PropTypes.func,
};

CommentList.defaultProps = {
  data: {},
  onCommentDelete: () => {},
  onCommentUpdate: () => {},
};

export default CommentList;
