import './Header.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { queryString } from '../../helpers/queryString'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut, requestUserData } from '../../actions/logActions'
import { getPrivateToken } from '../../api/privateServices'
import { useEffect } from 'react'


export const Header = () => {

    const navigate = useNavigate()
    const code = new URLSearchParams(window.location.search).get("code");
    const { logged, user } = useSelector(state=>state.log)
    const dispatch = useDispatch()
    

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
         if (refreshToken) {
            dispatch(logIn());
         }
        if (!refreshToken&&code){
            getPrivateToken(code)
                .then(res => {
                    localStorage.setItem('token', res.access_token);
                    localStorage.setItem('refreshToken', res.refresh_token);
                    dispatch(logIn());
                    window.location.reload()
                })
                .catch(() => dispatch(logOut())) 
                .finally(()=>window.history.pushState({}, null, "/"))   
        }
        
    }, [])

    useEffect(() => {
        if (logged) {
            dispatch(requestUserData()) 
            console.log('pedi datos de usuario')
        }
    }, [logged])

    const handleLogOut = ()=>{
        dispatch(logOut());
        localStorage.clear(); 
        navigate('/');
    }


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

            {logged ?
                <div className='login-active'>
                    <p>Hi <span>{user.name}</span> !</p>
                    <button onClick={() =>handleLogOut()} className='login'>
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
