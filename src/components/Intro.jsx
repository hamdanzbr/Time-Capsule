import React, { useEffect, useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

const Intro = () => {
    const [isSignup,setIsSignup]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            return navigate('/home')
        }
    },[])

  return (
    <>
         {
      isSignup ?(
            <Signup onLoginClick={()=>setIsSignup(false)} />

      ):(
        <Login onSignupClick={()=>setIsSignup(true)}/>
      )
    }
    </>
  )
}

export default Intro