import { useContext } from 'react';
import '../App.css'
import { MdDelete } from "react-icons/md";
import { PostListContext } from '../store/post-store';

const Post = ({ post }) => {
  const {deletePost} = useContext(PostListContext);
  return (
    <div className="card post" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger deletebtn" onClick={()=>deletePost(post.id)}>
            <MdDelete/>
          </span>
        </h5>
        <p className="card-text ">{post.body}</p>
        {post.tags.map(tag=><span key={tag} className="badge text-bg-primary hashtag">{tag}</span>)}
      </div>
      <span className="badge rounded-pill text-bg-success" style={{width:"100%",}}>{post.reactions} people reacted on this post.</span>
     </div>
  );
};
export default Post;
