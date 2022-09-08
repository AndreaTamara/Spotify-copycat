import './DetailHeader.css'
import { MdVerified } from 'react-icons/md'
import { SaveIcon } from '../SaveICon'
import { changeSrc, music, selectImage } from '../../helpers/selectImage'

export const DetailHeader = ({ url, type, name, description, tracks, urlArtist, artistView, savedView }) => {
  let element;
  return (
    <header className={`detail-header ${artistView && 'detail-header-artistView'}`}>
      {!artistView &&
        <div className='detail-header-img'>
          {savedView ?
            <SaveIcon />
            :
            <img className='hero-img'
              src={selectImage(url)}
              alt='cover album'
              ref={el => element = el}
              onError={() => changeSrc(music, element)} />}
        </div>}
      <div className='detail-header-info'>
        <h6 className='detail-header-info-type'>
          {(artistView && type) && <MdVerified />}
          {type}
        </h6>
        <h1 className='detail-header-info-name'>{name}</h1>
        {urlArtist && <img className='artist-img' src={urlArtist} alt='artist' />}
        {!artistView && <h6 className='detail-header-info-description'>{description}</h6>}
        <h6 className='detail-header-info-tracks'>
          {`${tracks} ${artistView && tracks ? 'Followers' : 'tracks'}`}
        </h6>
      </div>
    </header>
  )
}
