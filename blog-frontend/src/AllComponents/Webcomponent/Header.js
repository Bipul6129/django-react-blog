import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
<nav className="navbar navbar-expand-lg bg-light ">
  <div className="container-fluid">
    <a className="navbar-brand text-link" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active text-link" aria-current="page" to='/login'>Login</Link>
        <Link className="nav-link active text-link" aria-current="page" to='/blogs'>Blogs</Link>
        <a className="nav-link text-link" href="#">Pricing</a>
        <a className="nav-link disabled text-link">Disabled</a>
      </div>
    </div>
  </div>
</nav>
    
  )
}
