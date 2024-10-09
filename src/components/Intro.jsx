import React from 'react'
import { useSelector } from 'react-redux'
import Signup from './Signup'
import Login from './Login'

const Intro = () => {
    const isSignupPage=useSelector(store=>store.app.isSignupPage)
  return (
    <>
         {
      isSignupPage ?(
            <Signup/>

      ):(
        <Login/>
      )
    }
    </>
  )
}

export default Intro