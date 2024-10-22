// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL API
const API_URL = 'https://jsonplaceholder.typicode.com';

// Thunks untuk melakukan request ke API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    postDetail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetPostDetail: (state) => {
      state.postDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postDetail = action.payload;
      });
  },
});

export const { resetPostDetail } = postsSlice.actions;
export default postsSlice.reducer;
