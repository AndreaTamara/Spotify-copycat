import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import { useGetData } from '../../hooks/useGetData'
import { userSavedTracksUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { cutTextString } from '../../helpers/cutTextString'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'


export const SavedTracks = () => {

  const { loggedIn, user } = useContext(authContext)
  
  const { data: savedTracks, loading: savedTracksLoading, error: savedTracksError } = useGetData(userSavedTracksUrl, loggedIn, true)
  
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
      <DetailViewCommandBar savedView={true}/>
      <DetailTrackList>
        {savedTracksLoading && <p>loading...</p>}
        {savedTracksError && <p>ocurrió un error: {savedTracksError.error?.message}</p>}
        {savedTracks?.items.map((item, i) => {
          return (
            <TrackCard
              key={item.track.id}
              number={i + 1}
              name={cutTextString(item.track.name,25)}
              author={item.track.artists.map(artist => {
                  return {name:artist.name,id:artist.id}
                })}
              album={cutTextString(item.track.album.name,25)}
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