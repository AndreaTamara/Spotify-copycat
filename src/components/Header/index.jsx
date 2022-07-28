import './Header.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { queryString } from '../../helpers/queryString'
import {useLocation, useSearchParams} from 'react-router-dom'


export const Header = () => {

    const navigate = useNavigate()

    const [location] = (useSearchParams(useLocation().search))
    const code = location.get('code')
    
    console.log(code)

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
            <a  href={queryString()}className='login'>
                {code?'Log out':'Log in'}
            </a>
        </header>
    )
}
