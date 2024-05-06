import React from 'react'
import Feed from './Feed'

const Home = ({ posts }) => {
  return (
    <main>
        {posts.length ? (
            <Feed />
        ) : (
          <p style={{ marginTop: "2rem"}}>
            No posts to display
          </p>
        )}
    </main>
  )
}

export default Home