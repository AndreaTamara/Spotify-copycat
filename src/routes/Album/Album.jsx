import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { useContext, useEffect } from 'react'
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
  const { data: album, loading: albumLoading, error: albumError } = useGetData(albumUrl(albumId), loggedIn, false)


  return (
    <DetailViewContainer>
      {albumLoading && <p>loading...</p>}
      {albumError && <p>ocurrió un error: {albumError.error?.message}</p>}

      {album &&
        <DetailHeader
          url={album?.images[0].url}
          type={album?.album_type}
          name={album?.name}
          description={album?.artists.map(artist => artist.name).join(',')}
          tracks={album?.total_tracks}
        />}
      <DetailViewCommandBar />
      <DetailTrackList albumView={true}>
        {itemsAlbumLoading && <p>loading...</p>}
        {itemsAlbumError && <p>ocurrió un error: {itemsAlbumError.error?.message}</p>}
        {itemsAlbum?.items.map((item, i) => {
          return (
            <TrackCard
              albumView={true}
              key={item.id}
              number={i + 1}
              name={cutTextString(item.name, 25)}
              author={item.artists.map(artist => {
                return {name:artist.name,id:artist.id}
              })}
              time={convertMstoMin(item.duration_ms)}
            />
          )
        })}
      </DetailTrackList>
    </DetailViewContainer>
  )
}
