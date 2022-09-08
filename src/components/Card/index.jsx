import { useSelector } from 'react-redux';
import { PlayBtn } from '../PlayBtn';
import { Link } from "react-router-dom";
import './Card.css'
import { changeSrc, music, selectImage } from '../../helpers/selectImage';


export const Card = ({ name, author, imgUrl, type, uri, path }) => {

  const { currentUri } = useSelector(state => state.playing)

  let element;


  return (
    <div className='card-container'>
      <div className={`play-btn-card ${currentUri === uri && 'play-btn-active'}`}>
        <PlayBtn uri={uri} />
      </div>
      <Link to={path || ''}>
        <div className="card" >
          <div className={`card-img ${type}`}>
            <img
              src={selectImage(imgUrl, type)}
              alt='cover album'
              ref={el => element = el}
              onError={() =>changeSrc(music, element)}
            />
          </div>
          <div className="card-info">
            <h6 className="card-info-title">{name}</h6>
            <p className="card-info-description">{author}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
