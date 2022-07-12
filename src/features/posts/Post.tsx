import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import gitHubIcon from "@/assets/github.png";

// Code Formatting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Components
import { Card, Title, Group, Image } from "@mantine/core";

// Types
import { PostType } from "../../types";
function Post({ post }: { post: PostType }) {
  return post.hidden ? (
    <></>
  ) : (
    <Card>
      <Group position="apart">
        <Title mt={0}>{post.title}</Title>
        {post.link ? (
          <a href={post.link}>
            {" "}
            <Image height={30} src={gitHubIcon} />
          </a>
        ) : (
          <></>
        )}
      </Group>
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
