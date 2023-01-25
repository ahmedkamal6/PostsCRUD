import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (args, thunkApi) => {
    try {
      const res = await fetch("http://localhost:3000/posts");
      const data = res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (args, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${args}`);
      const data = await res.json();
      localStorage.setItem("post",JSON.stringify(data))
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (newPost, thunkApi) => {
    const authState = thunkApi.getState().auth;
    newPost.userId = authState.userId;
    try {
      const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (newPost, thunkApi) => {
    const authState = thunkApi.getState().auth;
    console.log(newPost)
    try {
      const res = await fetch(`http://localhost:3000/posts/${newPost.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newPost.title,
          description: newPost.description,
          lastEditUserId: authState.userId,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      console.log(data)
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePosts",
  async (args, thunkApi) => {
    try {
      await fetch(`http://localhost:3000/posts/${args}`, {
        method: "DELETE",
      });
      return args;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false, error: null, post: JSON.parse(localStorage.getItem('post')) },
  extraReducers: {
    //get Post

    [getPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;

      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get Posts

    [getPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //edit Post
    [editPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;

      state.post = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //create Post

    [insertPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [insertPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [insertPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete Post

    [deletePost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
