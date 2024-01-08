import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-store";
import WelcomeMessage from "./WelcomeMessage";
import Loader from "./Loader";

const PostList = () => {
  const { postList, fetched } = useContext(PostListContext);

  return (
    <>
      {!fetched && <Loader />}
      {fetched && postList.length === 0 && <WelcomeMessage />}
      {fetched &&
        postList.map((post) => <Post key={post.id} post={post}></Post>)}
    </>
  );
};
export default PostList;
