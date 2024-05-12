import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Routes, Route} from "react-router-dom";
import EditPost from "./EditPost";
import { DataProvider } from "./context/DataContext";


function App() {    
  return (
    <div className="App">
      <Header title= "My Blog"/>
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts" element={<NewPost/>}/>
            <Route path="/edit/:id" element={<EditPost/>} />
          <Route path="/about" element={<About />}/>
          <Route path="/posts/:id" element={<PostPage />}/>
          <Route path="*" element={<Missing />}/>
        </Routes>
      </DataProvider>
      <Footer />
    </div>
    
  )
}
export default App;