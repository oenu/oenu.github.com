import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Styles
import "./App.css";

// Components
import Post from "./Components/Post";

// Types
import { PostType } from "./types";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://fexutrlesdaielcvnpiu.supabase.co",
  /* cspell: disable-next-line */
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleHV0cmxlc2RhaWVsY3ZucGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjIxMTAsImV4cCI6MTk3MzEzODExMH0.nnP00yRLtb3tjm3aHLlX4eyBYwGVfaVT9fMSllh17Jk"
);

function App() {
  const [posts, setPosts] = useState(Array<PostType>());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get posts from the database
    const getPosts = async () => {
      const { data, error } = await supabase.from("posts");

      if (error) {
        console.error(error);
      }
      if (data) {
        setPosts(data);
        setLoading(false);
        console.log(data);
      }

      return () => {
        console.log("unmounting");
      };
    };

    getPosts();
  }, []);

  return (
    <div className="App">
      <header className="App-header"> Triggering rebuild</header>
      {loading ? (
        <div>Loading...</div>
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
  );
}

export default App;
