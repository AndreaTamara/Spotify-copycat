import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import { Home } from './routes/home/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element ={<Home/>}/>
        <Route path='search' element ={<div style={{height:'2000px'}}>search</div>}/>
        <Route path='*' element ={<div>not found</div>}/>
      </Route>    
    </Routes>
     
  </React.StrictMode>
  </BrowserRouter>
  
);

