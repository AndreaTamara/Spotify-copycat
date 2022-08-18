import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import { useSelector } from 'react-redux'
import { useGetData } from "../../hooks/useGetData";
import { newRealeasesUrl, featuredPlaylistsUrl, userPlaylistUrl, userTopArtistsUrl, userTopTracksUrl } from "../../api/endpoints";
import { cutTextString } from "../../helpers/cutTextString";
import './Home.css'



export const Home = () => {

  const { logged, user } = useSelector(state=>state.log)

  const { data: newRealeases, loading: newRealeasesLoading, error: newRealeasesError } = useGetData(newRealeasesUrl, logged, false)
  const { data: featuredPlaylists, loading: featuredPlaylistsLoading, error: featuredPlaylistsError } = useGetData(featuredPlaylistsUrl, logged, false)
  const { data: userPlaylist, loading: userPlaylistLoading, error: userPlaylistError } = useGetData(userPlaylistUrl, logged, true)
  const { data: userTopArtists, loading: userTopArtistsLoading, error: userTopArtistsError } = useGetData(userTopArtistsUrl, logged, true)
  const { data: userTopTracks, loading: userTopTracksLoading, error: userTopTracksError } = useGetData(userTopTracksUrl, logged, true)


  return (
    <section className="home-container">

      {logged &&
        <>
          <RowList title='Your playlists' id='userPlaylist'>
            {userPlaylistLoading && <p>loading...</p>}
            {userPlaylistError && <p>ocurrió un error: {userPlaylistError.error?.message}</p>}
            {userPlaylist?.items.map(playlist => {
              return (
                  <Card
                    key={playlist.id}
                    path={'/playlist/' + playlist.id}
                    uri={playlist.uri}
                    name={cutTextString(playlist.name, 30)}
                    author={cutTextString(playlist.description, 48)}
                    imgUrl={playlist.images[0].url}
                  />
              )
            })}
          </RowList>
          <RowList title='Your top artists' id='topArtists'>
            {userTopArtistsLoading && <p>loading...</p>}
            {userTopArtistsError && <p>ocurrió un error: {userTopArtistsError.error?.message}</p>}
            {userTopArtists?.items.map(artist => {
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
            {userTopTracksLoading && <p>loading...</p>}
            {userTopTracksError && <p>ocurrió un error: {userTopTracksError.error?.message}</p>}
            {userTopTracks?.items.map(track => {
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
        </>
      }
      <RowList title='Released this week' id='released'>
        {newRealeasesLoading && <p>loading...</p>}
        {newRealeasesError && <p>ocurrió un error: {newRealeasesError.error?.message}</p>}
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
        {featuredPlaylistsLoading && <p>loading...</p>}
        {featuredPlaylistsError && <p>ocurrió un error: {featuredPlaylistsError.error?.message}</p>}
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
