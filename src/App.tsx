// Styles
import "./App.css";

// Components
import PostList from "./features/posts/PostList";

// Database
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://fexutrlesdaielcvnpiu.supabase.co",
  /* cspell: disable-next-line */
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleHV0cmxlc2RhaWVsY3ZucGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjIxMTAsImV4cCI6MTk3MzEzODExMH0.nnP00yRLtb3tjm3aHLlX4eyBYwGVfaVT9fMSllh17Jk"
);

function App() {
  return (
    <div className="App">
      <PostList />
    </div>
  );
}

export default App;
