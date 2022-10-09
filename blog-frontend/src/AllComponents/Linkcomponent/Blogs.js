import React, { useContext } from 'react'
import Blogapi, { BlogapiProvider } from '../Api/Blogapi'
import axios from 'axios'
import { createContext,useState,useEffect } from "react";
import { render } from '@testing-library/react';
import {Link} from 'react-router-dom';

export default function Blogs() {
  const [loaded,setload] = useState(false)
  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get('http://192.168.1.67:8000/blog/')
    .then(res => {
      console.log(res.data)
      setload(true)
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
      setload(false)
    })
    
  },[]);

  if(loaded){
    return(
      <ul>
        {posts.map(post => {
          return(
            <li key={post.id}><Link to={{pathname:'/blogdetail/'+post.id,state:{stateParam:true}}}>{post.title}</Link></li>
          )
        })}
      </ul>

    )
  }else{
    return(
      <div>
          <p>Loading......</p>
      </div>
      )

  }

  
    
      
    



  

 


    
   

  
  
}
