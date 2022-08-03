import { FiHeart } from 'react-icons/fi'
import { PlayBtn } from '../PlayBtn'
import './DetailViewCommandBar.css'

export const DetailViewCommandBar = ({artistView}) => {
  return (
    <section className={`command-bar ${artistView&&'command-bar-artistView'}`}>
    <PlayBtn />
    <FiHeart className='save-btn' />
  </section>
  )
}
