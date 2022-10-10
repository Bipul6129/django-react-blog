import React from 'react'
import BlogapiContext from '../Api/Blogapi'
import { useContext } from 'react'
import axios from "axios";
import Blogs from './Blogs';

export const CreateBlog = () => {
    let{authTokens} = useContext(BlogapiContext)
    let {loggedin}=useContext(BlogapiContext)

    let createblog =async (e )=>{
        e.preventDefault()
        let response = await fetch('http://192.168.1.67:8000/blog/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'JWT '+ String(authTokens.access)
            },
            body:JSON.stringify({'title':e.target.title.value,'content':e.target.content.value})
        })
        let data = await response.json()
        console.log('data:',data)
        console.log(response)

        if(response.status ===201){
            alert('New Blog created')
            console.log('created sucessfully')
            

        }else{
            alert('something went wrong')
        }
        
    }

    if(!loggedin){
        return <Blogs/>
    }else{
        return (
            <>
            <h2>Create a Blog</h2>
            <form onSubmit={createblog}>
                Title<input type='text' name='title' placeholder='Enter title'/>
                Content<input type='text' name='content' placeholder='Enter content'/>
                <input type='submit' value='submit'/>
            </form>
            </>
          )

    }

    



  
}
