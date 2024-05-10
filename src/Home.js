import React from 'react'
import Feed from './Feed'

const Home = ({ posts, isLoading, fetchError }) => {
  return (
    <main   className='Home'>
        {isLoading && <p className='statusMsg'> Loading Data..</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{ color:'red'}}> Network Error. Cannot Display post try refreshing page</p>}
        
        {!isLoading && !fetchError &&
            (posts.length ? <Feed posts={posts}/> : <p className='statusMsg'> No posts to display</p>)
        }
    </main>
  )
}

export default Home