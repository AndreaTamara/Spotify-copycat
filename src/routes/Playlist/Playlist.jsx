import { DetailHeader } from '../../components/DetailHeader'
import { PlayBtn } from '../../components/PlayBtn'
import { FiHeart } from 'react-icons/fi'
import './Playlist.css'
import { TrackCard } from '../../components/TrackCard'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import { useGetData } from '../../hooks/useGetData'
import { itemsAlbumUrl, itemsPlaylistUrl, PlaylistUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { useParams } from 'react-router-dom'
import { cutTextString } from '../../helpers/cutTextString'

const idTracks = ["3ArV3UPyVIgRkV8BrrwAGZ", "42X58dLQKMGKG3p7DsITWn", "4PpuZIMmeng6qPicveSI22", "10rzSpg3kTFSr5e5tFy60A", "0ynMdz0BsYpaiemBi26rid", "4nMumbauSUmFSXyv5xDLL5"]

export const Playlist = () => {

  const { loggedIn, user } = useContext(authContext)
  const {playlistId} = useParams()
  const {albumId} = useParams()
  // console.log(playlistId)
  const { data: itemsPlaylist, loading: itemsPlaylistLoading, error: itemsPlaylistError } = useGetData(itemsPlaylistUrl(playlistId), loggedIn, false)
  const { data: playlist, loading: playlistLoading, error: playlistError } = useGetData(PlaylistUrl(playlistId), loggedIn, false)
  const { data: album, loading: albumLoading, error: albumError } = useGetData(itemsAlbumUrl(albumId), loggedIn, false)// console.log(playlist)
  return (
    <section className="playlist-container">
      {playlistLoading && <p>loading...</p>}
      {playlistError && <p>ocurrió un error: {playlistError.error?.message}</p>}
      
      {playlist &&<DetailHeader
      url={playlist?.images[0].url}
      type={playlist?.type}
      name={playlist?.name}
      description={playlist?.description}
      tracks={playlist?.tracks.total}
      />}
      <section className='command-bar'>
        <PlayBtn />
        <FiHeart className='save-btn' />
      </section>
      <section className='tracks-list'>
        <TrackCard
          header={true} />
        {itemsPlaylistLoading && <p>loading...</p>}
        {itemsPlaylistError && <p>ocurrió un error: {itemsPlaylistError.error?.message}</p>}
        {itemsPlaylist?.items.map((item, i) => {
          return (
            <TrackCard
              key={item.track.id}
              number={i + 1}
              name={item.track.name}
              author={cutTextString(item.track.artists.map(artist => artist.name).join(', '),34)}
              album={item.track.album.name}
              url={item.track.album.images[0].url}
              time={convertMstoMin(item.track.duration_ms)}
            />
          )
        })}
      </section>

    </section>
  )
}
