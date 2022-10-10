import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import BlogapiContext from '../Api/Blogapi'
import axios from 'axios'
import Login from './Login'
import Blogs from './Blogs'
import { useNavigate } from 'react-router-dom'



export const UserBlogs = () => {
    let navigate=useNavigate()
    let{authTokens} = useContext(BlogapiContext)
    let {loggedin}=useContext(BlogapiContext)
    const[userblogs,setBlog] = useState([])
    const[blogloading,setblogloading]=useState(true)
    const[deleted,setdeleted]=useState(false)
    let{editblog}=useContext(BlogapiContext)



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

      let deleteblog=(e )=> {
        console.log(e.target.value);
        
            axios.delete('http://192.168.1.67:8000/blog/'+e.target.value,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'JWT '+ String(authTokens.access)
                }
            })
            .then(res => {
              console.log(res)
              alert('deleted')
            })
            .catch(err => {
              console.log(err)
              
            })
            
         
    }

   
       
        
        
    

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
            <table>
            <tbody >
            {userblogs.map(blog=>{
                return(
                    
                        
                        <tr key={blog.id} >
                        <td >{blog.title}</td>
                        <td><button value={blog.id} onClick={e=> deleteblog(e,"value")}>Delete</button></td>
                        <td><button value={blog.id} onClick={e=> navigate('/editblog',{
                          state:{
                            editblog:blog.id
                          }
                        })}>edit</button></td>
                        </tr>
                        
                        
                    
                    
                )
            })}
            </tbody>
            </table>
            </>
            
          )

    }
  
}
