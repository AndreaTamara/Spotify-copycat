import './DetailHeader.css'

export const DetailHeader = ({url,type,name,description,tracks,urlArtist,artistView}) => {
  return (
    <header className={`detail-header ${artistView&&'detail-header-artistView'}`}>
       {!artistView&& <div className='detail-header-img'>
        <img className='hero-img' src={url} alt='cover album'/>
        </div>}
        <div className='detail-header-info'>
            <h6 className='detail-header-info-type'>{type}</h6>
            <h1 className='detail-header-info-name'>{name}</h1>
            {urlArtist&& <img className='artist-img' src={urlArtist} alt='artist'/>}
            {!artistView&&<h6 className='detail-header-info-description'>{description}</h6>}
            <h6 className='detail-header-info-tracks'>{`${tracks} ${artistView?'Followers':'tracks'}`}</h6>
        </div>
    </header>
  )
}
