import { DetailHeader } from '../../components/DetailHeader'
import { PlayBtn } from '../../components/PlayBtn'
import {FiHeart} from 'react-icons/fi'
import './Playlist.css'
import { TrackCard } from '../../components/TrackCard'

export const Playlist = () => {
  return (
    <section className="playlist-container">
        <DetailHeader/>
        <section className='command-bar'>
          <PlayBtn/>
          <FiHeart className='save-btn'/>
        </section>
        <section className='tracks-list'>
          <TrackCard
          header={true}/>
          <TrackCard
          number={20} 
          name='ejemplo track'
          author='rupatrupa'
          album='nombre album'
          time= '3:34'
          />
          <TrackCard
          number={1} 
          name='this is not america'
          author='residente feat lebiy'
          album='nombre album latino'
          time= '3:34'
          />
        </section>
        
    </section>
  )
}
