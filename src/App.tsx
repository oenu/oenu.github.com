// React
import { useEffect } from "react";

// Redux
import { getPostsStatus, fetchPostsAsync } from "@/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Styles
import "./App.css";

// Components
import PostList from "./features/posts/PostList";

function App() {
  const dispatch = useAppDispatch();
  const postsStatus = useAppSelector(getPostsStatus);
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPostsAsync());
    }
  }, [postsStatus, dispatch]);
  return (
    <div className="App">
      <PostList />
    </div>
  );
}

export default App;
