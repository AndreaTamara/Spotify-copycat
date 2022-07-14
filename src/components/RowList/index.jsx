import './RowList.css';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'

export const RowList = ({ children, title, id }) => {

    function scrollContainer(id, { isNegative } = {}) {
        return () => {
          const scrollableContainer = document.getElementById(id);
          console.log(scrollableContainer)
          const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
      
          scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
        };
      }

    // const onHorizontalScroll= ()=>{
    //     console.log('pdte')
    // }

    return (
        <section className='row-list'>
            <span className='row-list-title'>
                <h2>{title}</h2>
                <nav className='back-forward'>
                <button
                    className="navBtns"
                    onClick={scrollContainer(id, { isNegative: true })}
                >
                    <MdOutlineArrowBackIosNew />
                </button>
                <button
                    className="navBtns"
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
