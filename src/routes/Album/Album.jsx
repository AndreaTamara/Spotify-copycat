import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'
import { Loader } from '../../components/Loader'
import { Info } from '../../components/Info'
import { useGetData } from '../../hooks/useGetData'
import { albumUrl, itemsAlbumUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { cutTextString } from '../../helpers/cutTextString'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'



export const Album = () => {

  const { logged } = useSelector(state => state.log)
  const { albumId } = useParams()
  const { data: itemsAlbum, loading: itemsAlbumLoading, error: itemsAlbumError } = useGetData(itemsAlbumUrl(albumId), logged, false)
  const { data: album, loading: albumLoading } = useGetData(albumUrl(albumId), logged, false)


  return (
    <DetailViewContainer>
      {(albumLoading || itemsAlbumLoading) && <Loader height='14rem' />}
      {itemsAlbumError && <Info msn={`Error ${itemsAlbumError?.status}: ${itemsAlbumError?.message}`} />}
      {(album && !itemsAlbumError) &&
        <>
          <DetailHeader
            url={album?.images[0].url}
            type={album?.album_type}
            name={album?.name}
            description={album?.artists.map(artist => artist.name).join(',')}
            tracks={album?.total_tracks}
          />
          <DetailViewCommandBar
            uri={album?.uri}
            id={album?.id}
            type='album' />
          <DetailTrackList albumView={true}>
            {itemsAlbum?.items.map((item, i) => {
              return (
                <TrackCard
                  uri={item.uri}
                  albumView={true}
                  key={item.id}
                  id={item.id}
                  number={i + 1}
                  name={cutTextString(item.name, 25)}
                  author={item.artists.map(artist => {
                    return { name: artist.name, id: artist.id }
                  })}
                  time={convertMstoMin(item.duration_ms)}
                />
              )
            })}
          </DetailTrackList>
        </>}
    </DetailViewContainer>
  )
}
