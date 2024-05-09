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
import api from './api/posts'
import EditPost from "./EditPost";

function App() {

  const history = useNavigate();

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
     const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
       } catch (err) {
        if(err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        } else {
          console.log(`Error:${err.message}`)
        }
      }
     }

     fetchPosts();
  }, [])
  useEffect(()=> {
    const filteredResults = posts.filter(
      (post)=> ((postBody).toLowerCase()).includes((search).toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResult(filteredResults.reverse());
  }, [posts, search])
    
  const handleSubmit = async(e)  => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy p');
    const newPost = { id, title: postTitle, datetime, body:postBody};
    
    try {
    const response = await api.post('/posts', newPost)
    const allPost = [...posts, response.data]
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    history('/'); 
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy p');
    const updatedPost = { id, title: editTitle, datetime, body:editBody};
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id == id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      history('/');
    } catch (err) {
      console.log( `Error: ${err.message}`);
    }
  }

  const handleDelete = async(id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post=> post.id !== id);
      setPosts(postsList);
      history('/');
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
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
          <Route path="/edit/:id" element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          } />
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