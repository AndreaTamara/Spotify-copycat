import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import { useSelector } from 'react-redux'
import { useGetData } from "../../hooks/useGetData";
import { newRealeasesUrl, featuredPlaylistsUrl, userPlaylistUrl, userTopArtistsUrl, userTopTracksUrl, userSavedAlbumssUrl } from "../../api/endpoints";
import { cutTextString } from "../../helpers/cutTextString";
import './Home.css'
import { Loader } from "../../components/Loader";
import { Info } from "../../components/Info";



export const Home = () => {

  const { logged} = useSelector(state => state.log)

  const { data: newRealeases, loading: newRealeasesLoading, error: newRealeasesError } = useGetData(newRealeasesUrl, logged, false)
  const { data: featuredPlaylists, loading: featuredPlaylistsLoading, error: featuredPlaylistsError } = useGetData(featuredPlaylistsUrl, logged, false)
  const { data: userPlaylist, loading: userPlaylistLoading, error: userPlaylistError } = useGetData(userPlaylistUrl, logged, true)
  const { data: userTopArtists, loading: userTopArtistsLoading, error: userTopArtistsError } = useGetData(userTopArtistsUrl, logged, true)
  const { data: userTopTracks, loading: userTopTracksLoading, error: userTopTracksError } = useGetData(userTopTracksUrl, logged, true)
  const { data: userAlbums, loading: userAlbumsLoading, error: userAlbumsError } = useGetData(userSavedAlbumssUrl, logged, true)

  return (
    <section className="home-container">

      {logged &&
        <>
          <RowList title='Your playlists' id='userPlaylist'>
            {userPlaylistLoading && <Loader />}
            {userPlaylistError && <Info msn={`Error ${userPlaylistError?.status}: ${userPlaylistError?.message}`}/>}
            {(userPlaylist?.items.length === 0) ?
              <Info msn='You haven´t created or saved any playlist yet' />
              : userPlaylist?.items.map(playlist => {
                return (
                  <Card
                    key={playlist.id}
                    path={'/playlist/' + playlist.id}
                    uri={playlist.uri}
                    name={cutTextString(playlist.name, 30)}
                    author={cutTextString(playlist.description, 48)}
                    imgUrl={playlist.images[0]?.url}
                  />
                )
              })}
          </RowList>
          <RowList title='Your top artists' id='topArtists'>
            {userTopArtistsLoading && <Loader />}
            {userTopArtistsError && <Info msn={`Error ${userTopArtistsError?.status}: ${userTopArtistsError?.message}`}/>}
            {(userTopArtists?.items.length === 0) ?
              <Info />
              : userTopArtists?.items.map(artist => {
                return (
                  <Card
                    key={artist.id}
                    path={'/artist/' + artist.id}
                    uri={artist.uri}
                    type='artist'
                    name={cutTextString(artist.name, 30)}
                    author={artist.type}
                    imgUrl={artist.images[0].url}
                  />
                )
              })}
          </RowList>
          <RowList title='Your top tracks' id='topTracks'>
            {userTopTracksLoading && <Loader />}
            {userTopTracksError && <Info msn={`Error ${userTopTracksError?.status}: ${userTopTracksError?.message}`}/>}
            {(userTopTracks?.items.length === 0) ?
              <Info />
              : userTopTracks?.items.map(track => {
                return (
                  <Card
                    path={'/album/' + track.album.id}
                    key={track.id}
                    uri={track.uri}
                    name={cutTextString(track.name, 30)}
                    author={cutTextString(track.artists.map(artist => artist.name).join(', '), 30)}
                    imgUrl={track.album.images[0].url}
                  />
                )
              })}
          </RowList>
          <RowList title='Your Albums' id='userAlbums'>
            {userAlbumsLoading && <Loader />}
            {userAlbumsError && <Info msn={`Error ${userAlbumsError?.status}: ${userAlbumsError?.message}`}/>}
            {(userAlbums?.items.length === 0) ?
              <Info msn='You haven´t saved any album yet' />
              : userAlbums?.items.map(item => {
                return (
                  <Card
                    key={item.album.id}
                    path={'/album/' + item.album.id}
                    uri={item.album.uri}
                    name={cutTextString(item.album.name, 30)}
                    author={cutTextString(item.album.artists.map(artist => artist.name).join(', '), 30)}
                    imgUrl={item.album.images[0]?.url}
                  />
                )
              })}
          </RowList>
        </>
      }
      <RowList title='Released this week' id='released'>
        {newRealeasesLoading && <Loader />}
        {newRealeasesError && <Info msn={`Error ${newRealeasesError?.status}: ${newRealeasesError?.message}`}/>}
        {newRealeases?.albums.items.map(album => {
          return (
            <Card
              key={album.id}
              path={'/album/' + album.id}
              uri={album.uri}
              name={cutTextString(album.name, 30)}
              author={cutTextString(album.artists.map(artist => artist.name).join(', '), 30)}
              imgUrl={album.images[0].url}
            />
          )
        })}
      </RowList>
      <RowList title='Featured Playlist' id='playlist'>
        {featuredPlaylistsLoading && <Loader />}
        {featuredPlaylistsError && <Info msn={`Error ${featuredPlaylistsError?.status}: ${featuredPlaylistsError?.message}`}/>}
        {featuredPlaylists?.playlists.items.map(playlist => {
          return (
            <Card
              key={playlist.id}
              path={'/playlist/' + playlist.id}
              uri={playlist.uri}
              name={playlist.name}
              author={cutTextString(playlist.description, 45)}
              imgUrl={playlist.images[0].url}
            />
          )
        })}
      </RowList>
    </section>
  )
}
