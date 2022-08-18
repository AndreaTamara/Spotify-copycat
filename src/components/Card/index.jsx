import { useSelector} from 'react-redux';
import { PlayBtn } from '../PlayBtn';
import { Link } from "react-router-dom";
import './Card.css'

export const Card = ({ name, author, imgUrl, type, uri, path }) => {
  const { currentUri} = useSelector(state=>state.playing)
  return (
    <div className='card-container'>
      <div className={`play-btn-card ${currentUri === uri && 'play-btn-active'}`}>
        <PlayBtn uri={uri} />
      </div>
      <Link to={path || ''}>
        <div className="card" >
          <div className={`card-img ${type}`}>
            <img src={imgUrl} alt='cover album' />
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
