import { randomColor } from '../../helpers/randomColor'
import './ColorCard.css'

export const ColorCard = ({ title, imgUrl }) => {
   
    return (
        //backgroundImage:`url(${imgUrl})`
        <div className="color-card" style={{backgroundColor:randomColor()}}>
            <div className={`color-card-img`}>
                <img src={imgUrl} alt='cover album' />
            </div>
            <h6 className="color-card-title">{title}</h6>
        </div>
    )
}
