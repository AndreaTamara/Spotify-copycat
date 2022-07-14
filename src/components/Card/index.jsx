import './Card.css'

export const Card = () => {
  return (
    <div className="card">
        <div className="card-img">
            {/* <img src="#"/> */}
        </div>
        <div className="card-info">
            <h6 className="card-info-title">Título</h6>
            <p className="card-info-description">descripción</p>
        </div>

    </div>
  )
}
