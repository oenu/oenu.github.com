import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

// Types
import { PostType } from "../types";

function Post(post: PostType) {
  return post.hidden ? (
    <></>
  ) : (
    <div>
      <h1>{post.title}</h1>
      <ReactMarkdown remarkPlugins={[gfm]} children={post.body} />
    </div>
  );
}

export default Post;
