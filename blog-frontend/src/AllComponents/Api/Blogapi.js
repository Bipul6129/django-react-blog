import { createContext,useState,useEffect } from "react";
import React from 'react'
import axios from "axios";
import Blogs from "../Linkcomponent/Blogs";
import { useNavigate } from "react-router";
import EditBlog from "../Linkcomponent/EditBlog";
import { useLocation } from 'react-router-dom';

const BlogapiContext =createContext()
export default BlogapiContext;

export const BlogapiProvider = ({children}) => {
  const history = useNavigate()
  let [editblog,seteditblog]=useState([])
  let [editloading,seteditloading]=useState(true)
  
  let [loading,setloading] = useState(true)
  let [loggedin,setloggedin] = useState(false)
  let [loginerror,setloginerror] = useState(null)
  let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)

  //TRIGGERED WHEN LOGIN IN 
  let loginUser = async(e )=>{
    e.preventDefault()
    console.log('login clicked')
    let response = await fetch('http://192.168.1.67:8000/api/token/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
    })
    let data = await response.json()
    console.log(data)
    console.log(response)

    if(response.status ===401){
      setloginerror('Invalid username or password')

    }else if(response.status ===400){
      setloginerror('Invalid username or password')
    
    }else if(response.status ===200){
      setloginerror(null)
      setAuthTokens(data)
      localStorage.setItem('authTokens',JSON.stringify(data))
      setloggedin(true)
      

    }else{
      setloginerror('something went wrong')
    }
    
  }

  //TRIGGERED WHEN THE LOGOUT
  let logoutuser=() =>{
    setAuthTokens(null)
    setloggedin(null)
    localStorage.removeItem('authTokens')
    history('/login')
  }

  //TRIGGERED FOR AUTH TOKEN UPDATE
  let updateToken = async ()=>{
    let response = await fetch('http://192.168.1.67:8000/api/token/refresh/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authTokens?.refresh})
    })
    let data = await response.json()

    if(response.status===200){
      setAuthTokens(data)
      setloggedin(true)
      localStorage.setItem('authTokens',JSON.stringify(data))
    }else{
      logoutuser()
      
    }
    if(loading){
      setloading(false)
    }
  }

  //USEEFFECT FOR SETINTERVAL FOR TOKEN UPDATE
  useEffect(()=> {
    
    if(loading){
      console.log('update token called')
        updateToken()
    }
    let interval=setInterval(()=>{
        if(authTokens){
            updateToken()
        }
    },1000*60*6)
    return ()=> clearInterval(interval)

}, [authTokens,loading])


  ///FOR EDITING THE BLOG
  let Sendeditblog= async (e ) =>{
    e.preventDefault();
    console.log(e.target.eblogid.value)
    const eblogid=e.target.eblogid.value
    let response = await fetch('http://192.168.1.67:8000/blog/'+eblogid,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'JWT '+ String(authTokens.access)
            },
            body:JSON.stringify({'title':e.target.title.value,'content':e.target.content.value})
        })
        let data = await response.json()
        console.log('data:',data)
        console.log(response)

        if(response.status ===200){
            console.log('Updated sucessfully')
            

        }else{
            alert('something went wrong')
        }

}

  //CONTEXT DATA SHARED ACROSS
  let contextData={
    loginuser:loginUser,
    loginerror:loginerror,
    loggedin:loggedin,
    logoutuser:logoutuser,
    authTokens:authTokens,
    editblog:editblog,
    sendeditblog:Sendeditblog
  }

  return (
    <BlogapiContext.Provider value={contextData}>
        {loading ? null:children}
    </BlogapiContext.Provider>
  )
}
