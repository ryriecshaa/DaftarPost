// src/components/PostList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Post List
      </Typography>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{post.body.substring(0, 100)}...</Typography>
                  <Link to={`/posts/${post.id}`}>Read More</Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PostList;
