import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import BlogapiContext from '../Api/Blogapi'
import axios from 'axios'
import Login from './Login'

export const UserBlogs = () => {
    let{authTokens} = useContext(BlogapiContext)
    let {loggedin}=useContext(BlogapiContext)
    const[userblogs,setBlog] = useState([])
    const[blogloading,setblogloading]=useState(true)


    useEffect(() => {
        axios.get('http://192.168.1.67:8000/blog/userblog',{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'JWT '+ String(authTokens.access)
            }
        })
        .then(res => {
          console.log(res.data)
          setBlog(res.data)
          setblogloading(false)
          
        })
        .catch(err => {
          console.log(err)
          
        })
        
      },[]);
       
        
        
    

    if(!loggedin){
        return <Login></Login>

    }else{
        if(blogloading){
            return(
                <h2>Loading....</h2>
            )

        }
        return (
            <>
            <h2> My Blogs</h2>
            
            {userblogs.map(blog=>{
                return(
                    <li key={blog.id}>{blog.title}</li>
                )
            })}
            </>
            
          )

    }
  
}
