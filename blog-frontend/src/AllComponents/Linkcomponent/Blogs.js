import React, { useContext } from 'react'
import Blogapi, { BlogapiProvider } from '../Api/Blogapi'
import axios from 'axios'
import { createContext,useState,useEffect } from "react";
import { render } from '@testing-library/react';

export default function Blogs() {
  const [loaded,setload] = useState(false)
  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get('http://192.168.1.67:8000/blog/')
    .then(res => {
      console.log(res.data)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    
  },[]);

  
    return(
      <ul>
        {posts.map(post => {
          return(
            <li key={post.id}>{post.title}</li>
          )
        })}
      </ul>
    )



  

 


    
   

  
  
}
