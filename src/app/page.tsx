import React from 'react'
import HomePage from './home/page'
import LoginPage from './login/page';

const Home = () => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex flex-col'>
        <HomePage />
      </div>
    )
  }

  <LoginPage />
}

export default Home
