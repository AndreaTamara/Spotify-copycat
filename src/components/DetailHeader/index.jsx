import './DetailHeader.css'

export const DetailHeader = ({url,type,name,description,tracks}) => {
  return (
    <header className='detail-header'>
        <div className='detail-header-img'>
            <img className='hero-img' src={url} alt='cover album'/>
        </div>
        <div className='detail-header-info'>
            <h6 className='detail-header-info-type'>{type}</h6>
            <h1 className='detail-header-info-name'>{name}</h1>
            <h6 className='detail-header-info-description'>{description}</h6>
            <h6 className='detail-header-info-tracks'>{`${tracks} tracks`}</h6>
        </div>
    </header>
  )
}
