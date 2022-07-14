import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'

export const Home = () => {
  return (
    <section className="home-container">
        <RowList title='Released this week' id='released'>
            <Card name='titulo 1'/>
            <Card name='titulo 2'/>
            <Card name='titulo 3'/>
            <Card name='titulo 4'/>
            <Card name='titulo 5'/>
            <Card name='titulo 6'/>
            <Card name='titulo 7'/>
            <Card name='titulo 8'/>
            <Card name='titulo 9'/>
        </RowList>
        <RowList title='Featured Playlist' id='playlist'>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        </RowList>
        <RowList title='Genders' id='genders'>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
            <Card name='titulo 9'/>
            <Card name='titulo 9'/>
        </RowList>
        <RowList title='other' id='other'>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        <Card name='titulo 9'/>
        </RowList>
    </section>
  )
}
