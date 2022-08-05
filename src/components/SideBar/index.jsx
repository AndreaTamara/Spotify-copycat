import logo from '../../assets/Spotify-logo.svg';
import spotifyIcon from '../../assets/Spotify-Icon.svg';
import { HiHome ,HiSearch} from 'react-icons/hi'
import {NavLink} from 'react-router-dom'
import './SideBar.css'
import { useContext } from 'react';
import { authContext } from '../../context/authContext';
import { SaveIcon } from '../SaveICon';


export const SideBar = () => {
    const { loggedIn} = useContext(authContext);
    return (
        <aside className='side-bar'>
            <div className='logo'>
            <img  className='logo-desktop' src={logo} alt='spotify logo' />
            <img   className='logo-mobile' src={spotifyIcon} alt='spotify logo' />
            </div>      
                <nav className='nav-bar'>
                    <NavLink to='/' className='nav-bar-item'>
                        <span><HiHome /></span>
                        <p>Home</p>
                    </NavLink>
                    <NavLink to='search'className='nav-bar-item'>
                        <span><HiSearch /></span>
                        <p>Search</p>
                    </NavLink>
                    {loggedIn&&
                    <NavLink to='collection/tracks' className='nav-bar-item'>
                        <span><SaveIcon width='24px' height='24px'/></span>
                        <p>Saved tracks</p>
                    </NavLink>
                    }
                </nav>
            
        </aside>
    )
}
