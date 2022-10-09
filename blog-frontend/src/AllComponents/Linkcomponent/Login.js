import React, { useContext } from 'react'
import BlogapiContext from '../Api/Blogapi'
import Blogs from './Blogs'

export default function Login() {
  let {loginuser}=useContext(BlogapiContext)
  let {loginerror}=useContext(BlogapiContext)
  let {loggedin}=useContext(BlogapiContext)
  
  if (!loggedin){
    return (
      <>
      <h4>Login</h4>
      <div>
        <form onSubmit={loginuser}>
          <input type='text' name='username' placeholder='Enter your username'/>
          <input type='password' name='password' placeholder='Enter your password'/>
          {loginerror? (
            <p>{loginerror}</p>
          ):(<></>)}
          <input type='submit' value='submit'/>
        </form>
      </div>
      </>
    )

  }else{
    return <Blogs/>
  }
  
}
