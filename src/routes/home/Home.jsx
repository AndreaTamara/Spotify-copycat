import { useState, useEffect} from "react"
import { getToken } from "../../assets/fetchFuntions"
import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'
import { useGetData } from "../../assets/useGetData"

const  newRealeasesUrl = '/browse/new-releases';
const featuredPlaylistsUrl = '/browse/featured-playlists';
const browseUrl = '/browse/categories'

export const Home = () => {
  const [token,setToken] = useState(localStorage.getItem('token')) 
  console.log('inicio componente')
  // const [newRealeases, setNewReleases] = useState([]);
  // const [featuredPlaylists, setFeaturedPlayLists] = useState([]);
  // const [browse, setBrowse] = useState([]);
  const {data:newRealeases,loading:newRealeasesLoading, error:newRealeasesError} = useGetData(newRealeasesUrl,token)
  const {data:featuredPlaylists,loading:featuredPlaylistsLoading, error:featuredPlaylistsError} = useGetData(featuredPlaylistsUrl,token)
  const {data:browse,loading:browseLoading, error:browseError} = useGetData(browseUrl,token)
  useEffect(() => {
    // const token = localStorage.getItem('token')
    if (!token) {
      getToken().then(res => localStorage.setItem('token', res)).then(res=>setToken(res))
    }
  }, [token])



  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   fetch(baseUrl+newRealeasesUrl,
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + token,
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(res => setNewReleases(res.albums.items))
  //     .then(console.log(newRealeases))

  // }, [])


  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   fetch('https://api.spotify.com/v1/browse/featured-playlists',
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + token,
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(res => setFeaturedPlayLists(res.playlists.items))
  //     .then(console.log(featuredPlaylists))
  // }, [])


  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   fetch('https://api.spotify.com/v1/browse/categories',
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + token,
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(res => setBrowse(res.categories.items))
  //     .then(console.log(browse))
  // }, [])



  return (
    <section className="home-container">

      <RowList title='Released this week' id='released'>
        {newRealeasesLoading&&<p>loading...</p>}
        {newRealeasesError&&<p>ocurrió un error: {newRealeasesError.error.message}</p>}
        {newRealeases?.albums.items.map(album => {
          return (
            <Card
              key={album.id}
              name={album.name}
              author={album.artists.map(artist => artist.name).join(', ')}
              imgUrl={album.images[1].url}
            />
          )
        })}
      </RowList>
      <RowList title='Featured Playlist' id='playlist'>
      {featuredPlaylistsLoading&&<p>loading...</p>}
      {featuredPlaylistsError&&<p>ocurrió un error: {featuredPlaylistsError.error.message}</p>}
        {featuredPlaylists?.playlists.items.map(playlist => {
          return (
            <Card
              key={playlist.id}
              name={playlist.name}
              author={playlist.description.length > 48 ? `${playlist.description.substring(0, 40)}...` : playlist.description}
              imgUrl={playlist.images[0].url}
            />
          )
        })}
      </RowList>
      <RowList title='Browse' id='browse'>
      {browseLoading&&<p>loading...</p>}
      {browseError&&<p>ocurrió un error: {browseError.error.message}</p>}
        {browse?.categories.items.map(category => {
          return (
            <Card
              key={category.id}
              name={category.name}
              imgUrl={category.icons[0].url}
            />
          )
        })}
      </RowList>
    </section>
  )
}
