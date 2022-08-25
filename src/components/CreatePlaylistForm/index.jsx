import './CreatePlaylistForm.css'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'
import { createPlaylist } from '../../api/privateServices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export const CreatePlaylistForm = ({ setOpenModal }) => {

    const navigate = useNavigate()
    const {user}= useSelector(state=>state.log)
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [errorMsn, setErrorMsn]= useState('')
    const [required, setRequired] = useState('')

        const onSavePlaylist =()=>{
            if(name&&user){
                createPlaylist(user.id,name, description)
                .then(res=>{
                    if(res.status===201) {
                        setOpenModal(false)
                        navigate(`/playlist/${res.data.id}`)
                    }
                })
                .catch(()=>{
                    setErrorMsn('An error occurred. Try again')
                        setTimeout(()=>setErrorMsn(''),1000)
                })
            }else{
                setRequired ('Playlist name is required')
            }
        }

        const handleOnChange = (e)=>{
            setName(e.target.value) 
            setRequired('')
        }

    return (
        <form className='create-playlist-container'>
            {errorMsn&&<div className='create-playlist-error'>{errorMsn}</div>}
            <div className='create-playlist-header'>
                <h1 className='create-playlist-title'>Create a playlist</h1>
                <button
                    type='button'
                    className='create-playlist-close-btn'
                    onClick={() => setOpenModal(false)}>
                    <MdClose />
                </button>
            </div>
            
            <div className='input-name-container'>
            <input
                className={`create-playlist-input input-name ${required&&'required'}`}
                type='text'
                value={name}
                onChange={(e)=>handleOnChange(e)}
                placeholder='Add a name'
            />
            {required&&<p className='required-msn'>{required}</p>}
            </div>
            
    
            <textarea
                className='create-playlist-input input-description'
                placeholder='Add an optional description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />
            <button
                className='add-songs-btn create-playlist-btn'
                type='button'
                onClick={onSavePlaylist}
            >
                Save
            </button>
        </form>
    )
}
