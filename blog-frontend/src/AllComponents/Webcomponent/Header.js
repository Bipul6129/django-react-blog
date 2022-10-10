import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import BlogapiContext from '../Api/Blogapi'

export default function Header() {
  let {loggedin}=useContext(BlogapiContext)
  let {logoutuser}=useContext(BlogapiContext)
  return (
<nav className="navbar navbar-expand-lg bg-light ">
  <div className="container-fluid">
    <a className="navbar-brand text-link" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        {loggedin?(<>
        <Link className="nav-link active text-link" aria-current="page" onClick={logoutuser}>Logout</Link>
        <Link className="nav-link active text-link" aria-current="page" to='/createblog'>CreateBlog</Link>
        <Link className="nav-link active text-link" aria-current="page" to='/userblogs'>MyBlogs</Link>
        </>
        )
        :
        (
        <Link className="nav-link active text-link" aria-current="page" to='/login'>Login</Link>
        )}
        <Link className="nav-link active text-link" aria-current="page" to='/blogs'>Blogs</Link>
        
      </div>
    </div>
  </div>
</nav>
    
  )
}
