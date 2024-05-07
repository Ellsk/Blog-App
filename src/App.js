import { useEffect, useState } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { format } from 'date-fns'

function App() {

  const history = useNavigate();

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]) 

  useEffect(()=> {
    const filteredResults = posts.filter(
      (post)=> ((postBody).toLowerCase()).includes((search).toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResult(filteredResults.reverse());
  }, [posts, search])
    
  const handleSubmit = (e)  => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy p');
    const newPost = { id, title: postTitle, datetime, body:postBody};
    const allPost = [...posts, newPost]
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    history('/');
  }
  const handleDelete = (id) => {
    const postsList = posts.filter(post=> post.id !== id);
    setPosts(postsList);
    history('/');
  }
  return (
    <div className="App">
      
      <Header title= "React JS Blog"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
        
      <Routes>
        <Route path="/" element={
          <Home 
            posts={searchResult}
          />}/>
        <Route path="/posts" element={
          <NewPost 
            postTitle={postTitle}
            postBody={postBody}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}       
          />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/posts/:id" element={
          <PostPage 
            posts={posts}
            handleDelete={handleDelete}
          />}/>
        <Route path="*" element={<Missing />}/>
      </Routes>

      <Footer />  
    </div>
    
  )
}
export default App;