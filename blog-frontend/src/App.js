import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './AllComponents/Webcomponent/Header';
import Login from './AllComponents/Linkcomponent/Login';
import { BlogapiProvider } from './AllComponents/Api/Blogapi';
import Blogs from './AllComponents/Linkcomponent/Blogs';


function App() {
  return (
    <BrowserRouter>
    <Fragment>
      
       <Header/>
       <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/blogs' element={<Blogs/>}/>
       </Routes>
       
      
    </Fragment>
    </BrowserRouter>

  );
}

export default App;
