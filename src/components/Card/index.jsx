import './Card.css'

export const Card = ({name}) => {
  return (
    <div className="card">
        <div className="card-img">
            {/* <img src="#"/> */}
        </div>
        <div className="card-info">
            <h6 className="card-info-title">{name}</h6>
            <p className="card-info-description">description</p>
        </div>

    </div>
  )
}
