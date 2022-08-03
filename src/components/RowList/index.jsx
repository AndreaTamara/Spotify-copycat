import './RowList.css';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'

export const RowList = ({ children, title, id, artistView }) => {

    function scrollContainer(id, { isNegative } = {}) {
        return () => {
          const scrollableContainer = document.getElementById(id);
          const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
      
          scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
        };
      }
      
    return (
        <section className={`row-list ${artistView&&'row-list-artistView'}`}>
            <span className='row-list-title'>
                <h2>{title}</h2>
                <nav className='back-forward'>
                <button
                    className="row-list-scroll-btn"
                    onClick={scrollContainer(id, { isNegative: true })}
                >
                    <MdOutlineArrowBackIosNew />
                </button>
                <button
                    className="row-list-scroll-btn"
                    onClick={scrollContainer(id)}
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </nav>
            </span>

            <div className='row-list-items' id={id}>
                {children}
            </div>

        </section>
    )
}
