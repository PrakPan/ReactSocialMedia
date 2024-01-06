import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-store";

const CreatePost = ()=>{
  const UserIDElement=useRef();
  const titleElement=useRef();
  const contentElement=useRef();
  const reactionElement=useRef();
  const tagElements=useRef();

  const {addPost} =useContext(PostListContext);


  const handleSubmit=(event)=>{
     event.preventDefault();
     const UserID = UserIDElement.current.value;
     const title = titleElement.current.value;
     const content = contentElement.current.value;
     const reaction = reactionElement.current.value;
     const tags = tagElements.current.value;

     UserIDElement.current.value="";
     titleElement.current.value="";
     contentElement.current.value="";
     reactionElement.current.value="";
     tagElements.current.value="";
     
     addPost(UserID,title,content,reaction,tags);
  }
   return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="UserID" className="form-label"> Enter User ID</label>
    <input type="text" className="form-control" id="UserID" placeholder="Enter User Id" ref={UserIDElement}/>
  </div>
  <div className="mb-3">
    <label htmlFor="title" className="form-label"> Post Title</label>
    <input type="text" className="form-control" id="title" placeholder="Enter Title" ref={titleElement}/>
  </div>
  <div className="mb-3">
    <label htmlFor="content" className="form-label"> Enter Post Content</label>
    <textarea rows="4" className="form-control" id="content" placeholder="Enter Content" ref={contentElement}/>
  </div>
  <div className="mb-3">
    <label htmlFor="reactions" className="form-label"> Reactions</label>
    <input type="text" className="form-control" id="reactions" placeholder="Enter Number of Reactions" ref={reactionElement}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tags" className="form-label"> Enter Tags</label>
    <input type="text" className="form-control" id="tags" placeholder="Enter Tags" ref={tagElements}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Post</button>
</form>
   )
}
export default CreatePost;