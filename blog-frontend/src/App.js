import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './AllComponents/Webcomponent/Header';
import Login from './AllComponents/Linkcomponent/Login';
import { BlogapiProvider } from './AllComponents/Api/Blogapi';
import Blogs from './AllComponents/Linkcomponent/Blogs';
import Blogdetail from './AllComponents/Linkcomponent/Blogdetail';
import About from './AllComponents/Linkcomponent/About';
import {CreateBlog} from './AllComponents/Linkcomponent/CreateBlog';
import {UserBlogs} from './AllComponents/Linkcomponent/UserBlogs';


function App() {
  return (
    <BrowserRouter>
    <Fragment>
       <BlogapiProvider>
       <Header/>
       <Routes>
          
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/blogs' element={<Blogs/>}/>
          <Route path='/blogdetail/:blogid' element={<Blogdetail/>}/>
          <Route exact path='/createblog' element={<CreateBlog/>}/>
          <Route exact path='/userblogs' element={<UserBlogs/>}/>
       </Routes>
       </BlogapiProvider>
       
      
    </Fragment>
    </BrowserRouter>

  );
}

export default App;
