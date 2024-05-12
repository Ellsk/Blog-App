import React from 'react'
import Feed from './Feed'
import  { useContext } from 'react'
import DataContext from './context/DataContext'

const Home = () => {
  const { searchResult, isLoading, fetchError } = useContext(DataContext);
  return (
    <main   className='Home'>
        {isLoading && <p className='statusMsg'> Loading Data..</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{ color:'red'}}> Network Error. Cannot Display post try refreshing page</p>}
        
        {!isLoading && !fetchError &&
            (searchResult.length ? <Feed posts={searchResult}/> : <p className='statusMsg'> No posts to display</p>)
        }
    </main>
  )
}

export default Home