import './Header.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { queryString } from '../../helpers/queryString'
// import { useLocation, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'


export const Header = () => {

    const navigate = useNavigate()

    const { loggedIn, user, handleLogOut } = useContext(authContext)
    // const [location] = (useSearchParams(useLocation().search))
    // const code = location.get('code')


    return (
        <header className="header">
            <nav className='back-forward'>
                <button
                    className="navBtns"
                    onClick={() => navigate(-1)}
                >
                    <MdOutlineArrowBackIosNew />
                </button>
                <button
                    className="navBtns"
                    onClick={() => navigate(1)}
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </nav>

            {loggedIn ?
                <div className='login-active'>
                    <p>Hi {user.name}!</p>
                    <button onClick={() => handleLogOut()} className='login'>
                        Log out
                    </button>
                </div>
                :
                <a href={queryString()} className='login'>
                    Log in
                </a>
            }

        </header>
    )
}
