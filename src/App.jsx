import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import Project1 from './Project1';
import Project2 from './Project2';
import Project3 from './Project3';
import Project4 from './Project4';

import NotFound from './NotFound';

import Post from './Post';
import Update from './Update';
import Delete from './Delete';
import Login from './Login';
import SignUp from './SignUp';

import GlobalChat from './GlobalChat';

function App() {
  return (
     <BrowserRouter>
       <MainRoutes />
     </BrowserRouter>
  )
}

const Topbar = () => {
  return (
    <div className="top-bar">
      <h1>Supereact</h1>
      <nav>
        <Link to='/' className="topBtn">Menu</Link>
      </nav>
    </div>
  )
}


const MainRoutes = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      { location.pathname !== '/global-chat' && <Topbar /> }
       <Routes>
         <Route path='/' element={<Menu />} />
         <Route path='/login' element={<Login />} />
         <Route path='/sign-up' element={<SignUp />} />
         <Route path='/project1' element={<Project1 />} />
         <Route path='/project1/post' element={<Post />} />
         <Route path='/project1/update' element={<Update />} />
         <Route path='/project1/delete' element={<Delete />} />
         <Route path='/project2' element={<Project2 />} />
         <Route path='/project3' element={<Project3 />} />
         <Route path='/global-chat' element={<GlobalChat />} />
         <Route path='/project4' element={<Project4 />} />
         <Route path='*' element={<NotFound />} />
       </Routes>
    </>
  )
}

export default App
