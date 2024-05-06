import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();   
  const post = posts.find(post => (post.id).toString() === id )
  return (
    <main className="PostPage">
        <article className='post'>
          {post &&
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <button onClick={()=> handleDelete(post.id)}>
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