import { useEffect } from "react";

// Components
import Post from "./Post";

// Types
import { PostType } from "../../types";

// Redux
import { selectAllPosts, getPostsError, getPostsStatus } from "./postSlice";
import { useAppSelector } from "@/redux/hooks";

function PostList() {
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  let content: JSX.Element[] | JSX.Element | null = null;
  if (postsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (postsStatus === "succeeded") {
    if (posts === null) {
      content = <div>No posts found</div>;
    } else {
      content = posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ));
    }
  } else if (postsStatus === "failed") {
    content = (
      <div data-testid="errorMessage">
        Something went wrong, please contact me on{" "}
        <a href="https://twitter.com/_a_nb">twitter</a> or try again later.
      </div>
    );
  } else {
    content = <div>No Post Status Provided</div>;
  }

  return <>{content}</>;
}

export default PostList;
