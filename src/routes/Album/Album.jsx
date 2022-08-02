import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import { useGetData } from '../../hooks/useGetData'
import { albumUrl, itemsAlbumUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { useParams } from 'react-router-dom'
import { cutTextString } from '../../helpers/cutTextString'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'


export const Album = () => {

  const { loggedIn, user } = useContext(authContext)
  const { albumId } = useParams()
  const { data: itemsAlbum, loading: itemsAlbumLoading, error: itemsAlbumError } = useGetData(itemsAlbumUrl(albumId), loggedIn, false)
  const { data: album, loading: albumLoading, error: albumtError } = useGetData(albumUrl(albumId), loggedIn, false)
  
  return (
    <DetailViewContainer>
      {/* {playlistLoading && <p>loading...</p>}
      {playlistError && <p>ocurrió un error: {playlistError.error?.message}</p>}

      {playlist &&
        <DetailHeader
          url={playlist?.images[0].url}
          type={playlist?.type}
          name={playlist?.name}
          description={playlist?.description}
          tracks={playlist?.tracks.total}
        />}
      <DetailViewCommandBar />
      <DetailTrackList>
        {itemsPlaylistLoading && <p>loading...</p>}
        {itemsPlaylistError && <p>ocurrió un error: {itemsPlaylistError.error?.message}</p>}
        {itemsPlaylist?.items.map((item, i) => {
          return (
            <TrackCard
              key={item.track.id}
              number={i + 1}
              name={cutTextString(item.track.name,25)}
              author={cutTextString(item.track.artists.map(artist => artist.name).join(', '), 34)}
              album={cutTextString(item.track.album.name,25)}
              url={item.track.album.images[0].url}
              time={convertMstoMin(item.track.duration_ms)}
            />
          )
        })}
      </DetailTrackList> */}
    </DetailViewContainer>
  )
}
