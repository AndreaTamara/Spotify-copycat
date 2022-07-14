import './Header.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
export const Header = () => {
    return (
        <header className="header">
            <nav className='back-forward'>
                <button className="navBtns">
                    <MdOutlineArrowBackIosNew />
                </button>
                <button className="navBtns">
                    <MdOutlineArrowForwardIos />
                </button>
            </nav>
            <button className='login'>
                Log in
            </button>
        </header>
    )
}
