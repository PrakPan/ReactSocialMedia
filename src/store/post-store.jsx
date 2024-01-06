import { createContext } from "react";
import { useReducer } from "react";

export const PostListContext = createContext({
  postList:[],
  addPost : ()=>{},
  deletePost: ()=>{}
});


const postListReducer= (currState,action)=>{
  let newPost= currState;
  if(action.type === 'DELETE_ITEM'){
    newPost = currState.filter(item=> item.id !== action.payload.postId);
  }else if(action.type === 'ADD_POST'){
    newPost = [action.payload,...currState];
  }
  return newPost;
}

const PostListContextProvider =({children})=>{
  const [postList,dispatchPostList] =  useReducer(postListReducer,DEFAULT_POST_LIST);
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
    deletePost: deletePost}}>{children}
    </PostListContext.Provider>
    );
};

const DEFAULT_POST_LIST =[{
  id:'1',
  title:'Wushang Clan',
  body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  reactions:2,
  userId:'pp@6',
  tags: ['Abuse','Wushang'],
},
{
  id:'2',
  title:'Valo Clan',
  body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. OO jnsnk akjsbwdj sdnkjnw',
  reactions:23,
  userId:'pp@86',
  tags: ['Game','TitForTat','RegalTosX'],

}
];
export default PostListContextProvider;