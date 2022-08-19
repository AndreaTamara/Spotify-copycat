import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { useGetData } from '../../hooks/useGetData'
import { userSavedTracksUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { cutTextString } from '../../helpers/cutTextString'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'
import { useSelector } from 'react-redux'


export const SavedTracks = () => {

  const { logged, user } = useSelector(state=>state.log)

  const { data: savedTracks, loading: savedTracksLoading, error: savedTracksError } = useGetData(userSavedTracksUrl, logged, true)

  const trackUris = savedTracks?.items.map(item => {
    return (
      item.track.uri
    )
  })

  // console.log(trackUris)
  return (
    <DetailViewContainer>

      {savedTracks &&
        <DetailHeader
          savedView={true}
          type='playlist'
          name='Your Liked Songs'
          description={user?.name}
          tracks={savedTracks?.total}
        />}
      <DetailViewCommandBar savedView={true} uri={trackUris} />
      <DetailTrackList>
        {savedTracksLoading && <p>loading...</p>}
        {savedTracksError && <p>ocurrió un error: {savedTracksError.error?.message}</p>}
        {savedTracks?.items.map((item, i) => {
          return (
            <TrackCard
              uri={item.track.uri}
              key={item.track.id}
              id={item.track.id}
              number={i + 1}
              name={cutTextString(item.track.name, 25)}
              author={item.track.artists.map(artist => {
                return { name: artist.name, id: artist.id }
              })}
              album={cutTextString(item.track.album.name, 25)}
              url={item.track.album.images[0].url}
              time={convertMstoMin(item.track.duration_ms)}
              albumId={item.track.album.id}
            />
          )
        })}
      </DetailTrackList>
    </DetailViewContainer>
  )
}