
import './Layout.css';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { PlayBar } from '../../components/PlayBar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='App-container'>
      
        <SideBar />
        
          <Header />
          <section className='display-section'>
            <Outlet />
          </section>
        
      
      <PlayBar />
    </div>
  );
}

export default Layout;
