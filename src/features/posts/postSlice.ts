import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../redux/store";
import { supabase } from "@/App";

import { PostType } from "@/types";

export interface PostState {
  posts: PostType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
  },
});

// Fetch posts
export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (): Promise<PostType[]> => {
    try {
      const { data, error } = await supabase.from("posts");
      if (error) {
        throw error;
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const selectPosts = (state: RootState) => state.posts.posts;

export default postSlice.reducer;
