import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { supabase } from "@/utils/supabaseClient";

import { PostType } from "@/types";

export interface PostState {
  posts: PostType[] | null;
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
      console.log("fetching posts");
      const { data, error } = await supabase.from("posts");
      if (error) {
        console.log("error fetching posts", error);
        throw error;
      } else {
        console.log("fetched posts", data);
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export default postSlice.reducer;
