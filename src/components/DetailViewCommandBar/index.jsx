import { FiHeart } from 'react-icons/fi'
import { PlayBtn } from '../PlayBtn'
import './DetailViewCommandBar.css'

export const DetailViewCommandBar = ({artistView,savedView}) => {
  return (
    <section className={`command-bar ${artistView&&'command-bar-artistView'}`}>
    <PlayBtn />
    {!savedView&&<FiHeart className='save-btn' />}
  </section>
  )
}
