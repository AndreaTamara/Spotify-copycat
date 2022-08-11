import './PlayBtn.css'
import {BsFillPlayFill} from 'react-icons/bs'
import { useContext} from 'react'
import { playContext } from '../../context/playContext'
import { authContext } from '../../context/authContext'

export const PlayBtn = ({size,uri}) => {

  const {setCurrentUri} = useContext(playContext)
  const {loggedIn}= useContext(authContext)
    

  const handlePlay = (uri)=>{
    console.log('inicio play')
    if(uri&&loggedIn) setCurrentUri(uri)
  }
  return (
    <>
    {loggedIn?
    <div 
    className='playBtn' 
    onClick={()=>handlePlay(uri)}>
      <BsFillPlayFill className='playIcon'/>
    </div>
    :
    <div></div>
    }
    </>
    
  )
}
