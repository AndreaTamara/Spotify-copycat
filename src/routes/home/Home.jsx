import { useState, useEffect } from "react"
import { getToken } from "../../assets/fetchFuntions"
import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'

export const Home = () => {

  // const [token, setToken] = useState(null);
  const [newRealeases, setNewReleases] = useState([]);



  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      getToken().then(res => localStorage.setItem('token', res))
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://api.spotify.com/v1/browse/new-releases',
      {
        headers: {
          
          'Authorization': 'Bearer ' + token,
          
        }
      })
      .then(res => res.json())
      .then(res=>console.log(res.albums.items))
  }, [])


  return (
    <section className="home-container">
      <RowList title='Released this week' id='released'>
        <Card name='titulo 1' />
        <Card name='titulo 2' />
        <Card name='titulo 3' />
        <Card name='titulo 4' />
        <Card name='titulo 5' />
        <Card name='titulo 6' />
        <Card name='titulo 7' />
        <Card name='titulo 8' />
        <Card name='titulo 9' />
      </RowList>
      <RowList title='Featured Playlist' id='playlist'>
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
      </RowList>
      <RowList title='Genders' id='genders'>
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
      </RowList>
      <RowList title='other' id='other'>
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
        <Card name='titulo 9' />
      </RowList>
    </section>
  )
}
