import './Header.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
    const navigate = useNavigate()
    return (
        <header className="header">
            <nav className='back-forward'>
                <button
                    className="navBtns"
                    onClick={()=>navigate(-1)}
                >
                    <MdOutlineArrowBackIosNew />
                </button>
                <button
                    className="navBtns"
                    onClick={()=>navigate(1)}
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </nav>
            <button className='login'>
                Log in
            </button>
        </header>
    )
}
