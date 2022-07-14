
import './Layout.css';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { PlayBar } from '../../components/PlayBar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='App-container'>
      <main className='main-container'>
        <SideBar />
        <div className='display-header-container'>
          <Header />
          <section className='display-section'>
            <Outlet />
          </section>
        </div>
      </main>
      <PlayBar />
    </div>
  );
}

export default Layout;
