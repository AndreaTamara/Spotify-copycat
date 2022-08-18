// import { useContext } from "react"
import { browseUrl } from "../../api/endpoints"
// import { authContext } from "../../context/authContext"
import { useGetData } from "../../hooks/useGetData"
import { ColorCard } from "../ColorCard"
import { GridContainer } from "../GridContainer"
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import './BrowserView.css'

export const BrowserView = () => {
    const { logged} = useSelector(state=>state.log)
    const { data: browse, loading: browseLoading, error: browseError } = useGetData(browseUrl, logged, false)

    return (
        <>
        <h1 className="search-browse-title">Explore all</h1>
        <GridContainer>
            {browse?.categories.items.map(category => {
                return (
                    <Link to={'/category/'+category.id} key={category.id}>
                    <ColorCard
                        
                        title={category.name}
                        imgUrl={category.icons[0].url}
                    />
                    </Link>
                )
            })}
        </GridContainer>
    </>
    )
}
