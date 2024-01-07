import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-store";
import WelcomeMessage from "./WelcomeMessage";
import Loader from "./Loader";

const PostList =()=>{
  const {postList,addInitialPosts}= useContext(PostListContext);
  const [fetched,setFetched] = useState(false);

  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
   fetch('https://dummyjson.com/posts',{ signal })
  .then(res=>res.json())
  .then(data=>{
    addInitialPosts(data.posts)
    setFetched(true)})
 
    return ()=>{
      controller.abort();
    };
  },[]);

  return (
    <>
      {!fetched && <Loader/>}
      {fetched && postList.length === 0 && <WelcomeMessage />}
      {fetched && postList.map((post)=> <Post key={post.id} post={post}></Post>)}
    </>
  )
}
export  default PostList;