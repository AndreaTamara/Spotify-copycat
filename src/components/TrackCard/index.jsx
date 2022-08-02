import './TrackCard.css';
import { FiHeart, FiClock } from 'react-icons/fi';


export const TrackCard = ({ header, number, url, name, author, album, time,albumView }) => {
    return (
        <div className={`track-card ${header&&'track-card-header'}`}>
            <div className='track-number'>
                {header ? '#' : number}
            </div>
            <div className='track-name'>
                {(!header && !albumView) && <img className='track-img' src={url} alt='album cover' />}
                <span className='track-info'>
                     {header ? 'TITLE' : <p className='track-info-name'>{name}</p>}
                    {!header && <p className='track-info-author'>{author}</p>}
                </span>
            </div>
            {!albumView&&
            <div className='track-album'>
            {header ? 'ALBUM' : album}
            </div>
            }
            <div className='track-save'>
                {!header && <FiHeart className='save-btn' />}
            </div>
            <div className='track-time'>
                {header ? <FiClock /> : time}
            </div>
        </div>
    )
}
