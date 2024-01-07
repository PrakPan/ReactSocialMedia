const WelcomeMessage =({onGetPosts})=>{
  return <center><h2>Oops no post to see ..Create One !</h2><button className="text-bg-primary" onClick={onGetPosts}>Get Post Frrom Server</button></center> 
}
export default WelcomeMessage;