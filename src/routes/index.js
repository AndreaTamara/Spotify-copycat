import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Home } from './Home/Home';
import { Playlist } from './Playlist/Playlist';
import { Album } from './Album/Album';
import { Artist } from './Artist/Artist';
import { SavedTracks } from './SavedTracks/SavedTracks';
import { Search } from './Search/Search';

export const RoutesSpotify = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element ={<Home/>}/>
        <Route path='/playlist/:playlistId' element={<Playlist/>}/>
        <Route path='/album/:albumId' element={<Album/>}/>
        <Route path='/artist/:artistId' element={<Artist/>}/>
        <Route path='collection/tracks' element={<SavedTracks/>}/>
        <Route path='search' element ={<Search/>}/>
        <Route path='*' element ={<div>not found</div>}/>
      </Route>    
    </Routes>
  </BrowserRouter>
  )
}
