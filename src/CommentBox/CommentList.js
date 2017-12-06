import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import style from '../style';

const CommentList = ({ data }) => {
  const commentNodes = data.map((comment) => {
    const { _id, author, text } = comment;
    return (
      <Comment author={author} key={_id}>
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
};

CommentList.defaultProps = {
  data: {},
};

export default CommentList;
