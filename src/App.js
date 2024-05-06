import { useState } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Routes, Route, useHistory } from "react-router-dom";


function App() {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([

  ]) 
  return (
    <div className="App">
      
      <Header title= "React JS Blog"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
        
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/posts" element={<NewPost 
          posts={posts}
          setPosts={setPosts}        
        />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/post/:id" element={<PostPage />}/>
        <Route path="*" element={<Missing />}/>
      </Routes>

      <Footer />  
    </div>
    
  )
}
export default App;