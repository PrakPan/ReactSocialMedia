import { createContext } from "react";
import { useReducer } from "react";

export const PostListContext = createContext({
  postList:[],
  addPost : ()=>{},
  addInitialPosts: ()=>{},
  deletePost: ()=>{}
});


const postListReducer= (currState,action)=>{
  let newPost= currState;
  if(action.type === 'DELETE_ITEM'){
    newPost = currState.filter(item=> item.id !== action.payload.postId);
  }else if(action.type === 'ADD_INITIAL_POSTS'){
    newPost = action.payload.posts;
  }else if(action.type === 'ADD_POST'){
    newPost = [action.payload,...currState];
  }
  return newPost;
}

const PostListContextProvider =({children})=>{
  const [postList,dispatchPostList] =  useReducer(postListReducer,[]);
  const addPost =(UserID,title,content,reaction,tags)=>{
     dispatchPostList({
       type:"ADD_POST",
       payload:{
        id:Date.now(),
        title:title,
        body: content,
        reactions: reaction,
        userId: UserID,
        tags: tags.split(' '),
      }
     })
  }

  const addInitialPosts =(posts)=>{
    dispatchPostList({
      type:"ADD_INITIAL_POSTS",
      payload:{
      posts,
     }
    })
 }
  const deletePost =(postId)=>{
     dispatchPostList({
      type:"DELETE_ITEM",
      payload:{postId,
      },
     });
  }
  return (
    <PostListContext.Provider value={{postList,
    addPost : addPost,
    addInitialPosts: addInitialPosts,
    deletePost: deletePost}}>{children}
    </PostListContext.Provider>
    );
};

export default PostListContextProvider;