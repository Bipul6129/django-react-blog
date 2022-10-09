import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { createContext,useState,useEffect } from "react";

export default function Blogdetail() {
    const {blogid} = useParams()
    console.log(blogid)

    const [loaded,setload] = useState(false)
    const [post,setPost] = useState([])
  
    useEffect(() => {
      axios.get('http://192.168.1.67:8000/blog/'+blogid)
      .then(res => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      
    },[]);

  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>by -{post.getusername}</p>
    </div>
  )
}
