import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


const EditPost = ({ posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit}) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(()=>{
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post], setEditBody, setEditTitle)
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