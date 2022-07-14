import './RowList.css'

export const RowList = ({ children, title }) => {
    return (
        <section className='row-list'>
            <span className='row-list-title'>
                <h2>{title}</h2>
                <h6>ver todo</h6>
            </span>

            <div className='row-list-items'>
                {children}
            </div>

        </section>
    )
}
