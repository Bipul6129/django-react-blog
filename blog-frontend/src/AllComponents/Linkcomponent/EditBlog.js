import React, { useContext } from 'react'
import { createContext,useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import BlogapiContext from '../Api/Blogapi';
import axios from 'axios';
import Login from './Login';


export default function EditBlog() {
    let [editblog,seteditblog]=useState([])
    let [editloading,seteditloading]=useState(true)
    const location = useLocation()
    console.log(location.state.editblog)
    const editblogid=location.state.editblog
    let{authTokens} = useContext(BlogapiContext)
    let{sendeditblog}=useContext(BlogapiContext)
    let{loggedin}=useContext(BlogapiContext)

    useEffect(()=> {
        axios.get('http://192.168.1.67:8000/blog/'+editblogid,{
            headers:{
                'Content-Type':'application/json',  
            }
        })
        .then(res => {
          console.log(res.data)
          seteditblog(res.data)
          seteditloading(false)
        })
        .catch(err => {
          console.log(err)
          seteditloading(true)
          
    })
    },[])

    if(loggedin){
        if (editloading){
            return(
                <h3>LLoading....</h3>
            )
        
          }else{
            return (
                <>
                <div>EditBlog</div>
                <form onSubmit={sendeditblog}>
                    <input type='text' name='title' placeholder='Enter title' defaultValue={editblog.title} />
                    <input type='text' name='content' defaultValue={editblog.content} placeholder='Enter content'/>
                    <input type='hidden' name='eblogid' defaultValue={editblog.id}/>
                    <input type='submit' value='submit'/>
                </form>
                </>
               
              )
        
          }

    }else{
        return <Login/>
    }

    




    





  


  
}
