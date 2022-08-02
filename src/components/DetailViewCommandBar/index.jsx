import { FiHeart } from 'react-icons/fi'
import { PlayBtn } from '../PlayBtn'
import './DetailViewCommandBar.css'

export const DetailViewCommandBar = () => {
  return (
    <section className='command-bar'>
    <PlayBtn />
    <FiHeart className='save-btn' />
  </section>
  )
}
