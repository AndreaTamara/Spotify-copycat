import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Home } from './home/Home';
import { Playlist } from './Playlist/Playlist';
import { Album } from './Album/Album';
import { Artist } from './Artist/Artist';
import { SavedTracks } from './SavedTracks/SavedTracks';
import { Search } from './Search/Search';
import { Category } from './Category/Category';
import { Info } from '../components/Info';

export const RoutesSpotify = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='playlist/:playlistId' element={<Playlist />} />
          <Route path='album/:albumId' element={<Album />} />
          <Route path='artist/:artistId' element={<Artist />} />
          <Route path='collection/tracks' element={<SavedTracks />} />
          <Route path='search' element={<Search />} />
          <Route path='category/:categoryId' element={<Category />} />
          <Route path='*' element={<Info msn='404 - Not found'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
