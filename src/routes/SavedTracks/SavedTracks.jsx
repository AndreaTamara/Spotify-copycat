import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'
import { Loader } from '../../components/Loader'
import { Info } from '../../components/Info'
import { useGetData } from '../../hooks/useGetData'
import { userSavedTracksUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { cutTextString } from '../../helpers/cutTextString'
import { useSelector } from 'react-redux'



export const SavedTracks = () => {

  const { logged, user } = useSelector(state => state.log)

  const { data: savedTracks, loading: savedTracksLoading, error: savedTracksError } = useGetData(userSavedTracksUrl, logged, true)

  const trackUris = savedTracks?.items.map(item => item.track.uri)

  return (
    <DetailViewContainer>
      {savedTracksLoading && <Loader height='14rem' />}
      {savedTracksError &&
        <Info msn={`Error ${savedTracksError?.status}: ${savedTracksError?.message}`} />}
      {savedTracks &&
        <>
          <DetailHeader
            savedView={true}
            type='playlist'
            name='Your Liked Songs'
            description={user?.name}
            tracks={savedTracks?.total}
          />
          <DetailViewCommandBar
            savedView={true}
            uri={trackUris} />
          <DetailTrackList savedView={true}>
            {(savedTracks?.items.length === 0) ?
              <Info msn='You haven´t saved any song yet' />
              :
              savedTracks?.items.map((item, i) => {
                return (
                  <TrackCard
                    savedView={true}
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
        </>}
    </DetailViewContainer>
  )
}