import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
        <h1>Page Not Found</h1>
        <p>
          <Link to={"/"}>
              Vist our HomePage
          </Link> 
        </p>
    </main>
  )
}

export default Missing