import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Home } from './Home/Home';
import { Playlist } from './Playlist/Playlist';

export const RoutesSpotify = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element ={<Home/>}/>
        <Route path='/playlist/:id' element={<Playlist/>}/>
        <Route path='search' element ={<div style={{height:'2000px'}}>search</div>}/>
        <Route path='*' element ={<div>not found</div>}/>
      </Route>    
    </Routes>
  </BrowserRouter>
  )
}
