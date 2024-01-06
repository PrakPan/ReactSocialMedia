import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import PostList from './components/PostList'
import CreatePost from './components/CreatePost'
import { useState } from 'react'
import PostListContextProvider from './store/post-store'
function App() {
  const [selected,setSelected] = useState("Home");
  return (
    <PostListContextProvider>
    <div className="conatiner">
    <Sidebar selected={selected} setSelected={setSelected}/>
    <div className="right-box">
    <Header/>
    {selected === 'Home' ? <PostList/> : <CreatePost/> }
    <Footer/>
    </div>
    </div>
    </PostListContextProvider>
  );
}

export default App
