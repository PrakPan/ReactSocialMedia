import { createContext, useCallback, useState, useEffect } from "react";
import { useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetched: false,
  deletePost: () => {},
});

const postListReducer = (currState, action) => {
  let newPost = currState;
  if (action.type === "DELETE_ITEM") {
    newPost = currState.filter((item) => item.id !== action.payload.postId);
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPost = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPost = [action.payload, ...currState];
  }
  return newPost;
};

const PostListContextProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_ITEM",
        payload: { postId },
      });
    },
    [dispatchPostList]
  );

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetched(true);
      });

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PostListContext.Provider
      value={{
        postList,
        addPost: addPost,
        fetched: fetched,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListContextProvider;
