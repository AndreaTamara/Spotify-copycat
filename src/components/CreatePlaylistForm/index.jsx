import './CreatePlaylistForm.css'
import { MdClose } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { createPlaylist, editPlaylist } from '../../api/privateServices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export const CreatePlaylistForm = ({ setOpenModal, edit,editName, editDescription, playlistId, setSnapshotId }) => {

    const navigate = useNavigate()
    const {user}= useSelector(state=>state.log)
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [errorMsn, setErrorMsn]= useState('')
    const [required, setRequired] = useState('')

    useEffect(() => {
        if(editName) setName(editName)
        if(editDescription)setDescription(editDescription)
    }, [editName,editDescription])
    

        const onSavePlaylist =async()=>{
            if(name&&user){
                const request = edit?editPlaylist(playlistId,name, description):createPlaylist(user.id,name, description)
                try {
                    const response = await request
                    setOpenModal(false)
                    if(!edit&&response.status===201) { 
                        navigate(`/playlist/${response.data.id}`)
                    }
                    if(edit&&response.status===200) { 
                        setSnapshotId(String(Math.random()))
                        console.log('cambio snapshot')
                    }
                    
                } catch (error) {
                    setErrorMsn('An error occurred. Try again')
                        setTimeout(()=>setErrorMsn(''),1000)
                }
                // .then(res=>{
                //     if(res.status===201) {
                //         setOpenModal(false)
                //         navigate(`/playlist/${res.data.id}`)
                //     }
                // })
                // .catch(()=>{
                //     setErrorMsn('An error occurred. Try again')
                //         setTimeout(()=>setErrorMsn(''),1000)
                // })
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
                <h1 className='create-playlist-title'>{edit?'Edit details':'Create a playlist'}</h1>
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
