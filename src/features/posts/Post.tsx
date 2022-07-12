import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";

// Components
import { Card, Title } from "@mantine/core";

// Types
import { PostType } from "../../types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
function Post({ post }: { post: PostType }) {
  return post.hidden ? (
    <></>
  ) : (
    <Card>
      <Title mt={0}>{post.title}</Title>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={gruvboxDark}
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                // {...props} <-- Had to remove this to make it work
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[gfm]}
        children={post.body}
      />
    </Card>
  );
}

export default Post;

// References:
// https://amirardalan.com/blog/syntax-highlight-code-in-markdown
