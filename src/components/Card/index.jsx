import './Card.css'

export const Card = ({name, author, imgUrl}) => {
  return (
    <div className="card">
        <div className="card-img">
            <img src={imgUrl} alt='cover album'/>
        </div>
        <div className="card-info">
            <h6 className="card-info-title">{name}</h6>
            <p className="card-info-description">{author}</p>
        </div>

    </div>
  )
}
