// src/components/PostDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, resetPostDetail } from '../features/posts/postsSlice';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.posts.postDetail);

  useEffect(() => {
    dispatch(fetchPostById(postId));
    return () => {
      dispatch(resetPostDetail());
    };
  }, [dispatch, postId]);

  return (
    <Container>
      {postDetail ? (
        <>
          <Typography variant="h4" gutterBottom>
            {postDetail.title}
          </Typography>
          <Typography>{postDetail.body}</Typography>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default PostDetail;
