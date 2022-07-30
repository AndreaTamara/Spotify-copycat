import './DetailHeader.css'

export const DetailHeader = () => {
  return (
    <header className='detail-header'>
        <div className='detail-header-img'>
            <div className='hero-img'/>
        </div>
        <div className='detail-header-info'>
            <h6 className='detail-header-info-type'>tipo</h6>
            <h1 className='detail-header-info-name'>nombre</h1>
            <h6 className='detail-header-info-description'>descripción</h6>
            <h6 className='detail-header-info-tracks'># tracks</h6>
        </div>
    </header>
  )
}
