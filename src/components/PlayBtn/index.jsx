import './PlayBtn.css'
import { BsFillPlayFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { selectUriToPlay } from '../../actions/playingActions'

export const PlayBtn = ({ uri }) => {

  const dispatch = useDispatch()
  const { logged } = useSelector(state => state.log)

  const handlePlay = (uri) => {
    if (uri && logged) dispatch(selectUriToPlay(uri))
  }

  return (
    <>
      {logged ?
        <div
          className='playBtn'
          onClick={() => handlePlay(uri)}>
          <BsFillPlayFill className='playIcon' />
        </div>
        :
        <div></div>
      }
    </>

  )
}
