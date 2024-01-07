import { useContext } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList =()=>{
  const {postList,addInitialPosts}= useContext(PostListContext);
  const handlePosts=()=>{
    fetch('https://dummyjson.com/posts')
    .then(res=>res.json())
    .then(data=>addInitialPosts(data.posts));
  }
  return (
    <>
      {postList.length === 0 && <WelcomeMessage onGetPosts={handlePosts}/>}
      {postList.map((post)=> <Post key={post.id} post={post}></Post>)}
    </>
  )
}
export  default PostList;