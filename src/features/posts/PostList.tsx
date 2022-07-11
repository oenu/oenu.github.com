import { useEffect } from "react";

// Components
import Post from "./Post";

// Types
import { PostType } from "../../types";

// Redux
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPostsAsync,
} from "./postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

function PostList() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPostsAsync());
    }
  }, [postsStatus, dispatch]);

  let content: JSX.Element[] | JSX.Element | null = null;

  if (postsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post: PostType) => <Post key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = (
      <div>
        {error}
        <div>
          Something went wrong, please contacting me on{" "}
          <a href="https://twitter.com/_a_nb">twitter</a> or try again later.
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default PostList;
