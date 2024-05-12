import React, {useContext} from 'react'
import DataContext from './context/DataContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from './api/posts' 


const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const history = useNavigate();
  const { id } = useParams();   
  const post = posts.find(post => (post.id).toString() === id )
  
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
    <main className="PostPage">
        <article className='post'>
          {post &&
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>

            <Link to={`/edit/${post.id}`}>
              <button className='editPost'>
                EditPost
              </button>
            </Link>
            <button className='deletePost' onClick={()=> handleDelete(post.id)}>
              Delete Button
            </button> 
          </>
          }
          {!post && 
            <>
              <h2>Post Not Found</h2>
              <p>Well, thats dissappointing</p>
              <p>
                <Link to={"/"}>
                  Visit Our HomePage
                </Link>
              </p>
            </>
          }
        </article>
    </main>
  )
}

export default PostPage