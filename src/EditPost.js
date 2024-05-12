import React, { useEffect, useContext, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'
import { format } from 'date-fns';
import api from './api/posts'
import { useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { posts, setPosts} = useContext(DataContext);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { id } = useParams();
  const history = useNavigate();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(()=>{
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post], setEditBody, setEditTitle)

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy p');
    const updatedPost = { id, title: editTitle, datetime, body:editBody};
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      history('/');
    } catch (err) {
      console.log( `Error: ${err.message}`);
    }
  }
  return (
    <main className='NewPost'>
      {editTitle && 
        <>
          <h2> New Post </h2>
          <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor='postTitle'> Title </label>
            <input 
              id='postTItle'
              type='text'
              required
              value={editTitle}
              onChange={(e)=> setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'> Post </label>
            <textarea 
              id='postBody'
              type='text'
              required
              value={editBody}
              onChange={(e)=> setEditBody(e.target.value)}
            />
            <button type='submit' onClick={()=> handleEdit(post.id)}> Submit</button>
          </form>
        </>
      }

      {!editTitle && 
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
    </main>
  )
}

export default EditPost;