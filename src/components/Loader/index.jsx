import './Loader.css'

export const Loader = ({height='4rem'}) => {
  return (
    <div className='loader-container' style={{height:height}}>
        <div className='loader-dot'></div>
        <div className='loader-dot'></div>
        <div className='loader-dot'></div>
    </div>
  )
}
