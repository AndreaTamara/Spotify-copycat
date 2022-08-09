import './GridContainer.css'

export const GridContainer = ({children,categoryView}) => {
  return (
    <section className={`grid-container ${categoryView&&'grid-container-category-view'}`}>
        {children}
    </section>
  )
}
