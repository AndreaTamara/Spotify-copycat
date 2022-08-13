import { useContext } from "react"
import { DetailViewContainer } from "../../components/DetailViewContainer"
import { GridContainer } from "../../components/GridContainer"
import { authContext } from "../../context/authContext"
import {useParams} from 'react-router-dom'
import { useGetData } from "../../hooks/useGetData"
import { categoryUrl,categoryPlaylistUrl} from "../../api/endpoints"
import { cutTextString } from "../../helpers/cutTextString"
import { Card } from "../../components/Card"


export const Category = () => {
    const { loggedIn, user } = useContext(authContext)
    const { categoryId } = useParams()
    const { data, loading, error} = useGetData(categoryPlaylistUrl(categoryId), loggedIn, false)
    const {data:category}=useGetData(categoryUrl(categoryId),loggedIn, false)

  return (
    <DetailViewContainer>
        <h1 className="search-browse-title">{category?.name}</h1>
        <GridContainer categoryView={true}>
        {data?.playlists.items.map(item=>{
            if(item!==null)
                return(
                  <Card
                    key={item.id}
                    path={'/playlist/' + item.id}
                    uri={item.uri}
                    name={cutTextString(item.name, 30)}
                    author={cutTextString(item.description, 48)}
                    imgUrl={item.images[0].url}
                  />)                
        }
        )}

        </GridContainer>
    </DetailViewContainer>
  )
}
