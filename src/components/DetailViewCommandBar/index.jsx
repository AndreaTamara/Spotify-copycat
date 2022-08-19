import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { checkFollowedPlaylist } from '../../api/privateServices'
import { PlayBtn } from '../PlayBtn'
import './DetailViewCommandBar.css'

export const DetailViewCommandBar = ({artistView,savedView,uri,id,type}) => {
  const { logged, user } = useSelector(state => state.log)
  const [isSaved, setIsSaved] = useState(null)

  const checkIfIsSaved = (playlistId, userId) => {
    if (playlistId) {
      checkFollowedPlaylist(playlistId, userId)
            .then((res) => setIsSaved(res))
    }
}

useEffect(() => {
  if(logged) checkIfIsSaved(id,user.id)
}, [id,logged])

// const handleOnClickSave = (id) => {
//     if (!isSaved) {
//         saveTrack(id)
//             .then((res) =>{if(res===200) checkIfIsSaved(id)})
//     } else {
//         removeSavedTrack(id)
//             .then((res) =>{if(res===200)checkIfIsSaved(id)})
//     }
// }

  return (
    <section className={`command-bar ${artistView&&'command-bar-artistView'}`}>
    <PlayBtn uri={uri} />
    {(!savedView&&!artistView)&&
      <FiHeart className={`save-btn ${isSaved && 'active'}`} 
              // onClick={() => handleOnClickSave(id)}
      />}
  </section>
  )
}
