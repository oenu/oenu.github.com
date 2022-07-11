import React from "react";
import { useState, useEffect } from "react";

// Components
import Post from "./posts/Post";

// Types
import { PostType } from "../types";
function PostList() {
  const [posts, setPosts] = useState(Array<PostType>());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {}, []);
  return (
    <div>
      {" "}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {error ? (
            <div>
              Something went wrong, please contacting me on{" "}
              <a href="https://twitter.com/_a_nb">twitter</a> or try again
              later.
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                body={post.body}
                id={post.id}
                title={post.title}
                hidden={post.hidden}
                created_at={post.created_at}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
