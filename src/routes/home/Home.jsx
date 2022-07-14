import { Card } from "../../components/Card"
import { RowList } from "../../components/RowList"
import './Home.css'

export const Home = () => {
  return (
    <section className="home-container">
        <RowList title='Released this week'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </RowList>
        <RowList title='Featured Playlist'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </RowList>
        <RowList title='Genders'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </RowList>
    </section>
  )
}
