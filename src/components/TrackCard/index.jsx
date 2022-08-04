import './TrackCard.css';
import { FiHeart, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export const TrackCard = ({ header, number, url, name, author, album, time,albumView, albumId}) => {
    return (
        <div className={`track-card ${header&&'track-card-header'} ${albumView&&'track-card-album'}`}>
            <div className='track-number'>
                {header ? '#' : number}
            </div>
            <div className='track-name'>
                {(!header && !albumView) && <img className='track-img' src={url} alt='album cover' />}
                <span className='track-info'>
                     {header ? 'TITLE' : <p className='track-info-name'>{name}</p>}
                    {!header &&
                        <p  className='track-info-author'>
                        {author?.map((e,i)=>
                            <Link key={e.id} to={'/artist/'+e.id}>
                                {`${e.name}${(i+1)===author.length?'':','}`}
                            </Link>)}
                        </p>
                    }
                </span>
            </div>
            {!albumView&&
            <div className='track-album'>
            {header ? 'ALBUM' : <Link to={'/album/' + albumId}>{album}</Link> }
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
