import './PlayBtn.css'
import {BsFillPlayFill} from 'react-icons/bs'

export const PlayBtn = ({size}) => {
  return (
    <div className="playBtn">
      <BsFillPlayFill className='playIcon'/>
    </div>
  )
}
