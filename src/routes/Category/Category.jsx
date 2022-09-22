import { DetailViewContainer } from "../../components/DetailViewContainer"
import { GridContainer } from "../../components/GridContainer"
import { Card } from "../../components/Card"
import { Loader } from "../../components/Loader"
import { Info } from "../../components/Info"
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { useGetData } from "../../hooks/useGetData"
import { categoryUrl,categoryPlaylistUrl} from "../../api/endpoints"
import { cutTextString } from "../../helpers/cutTextString"



export const Category = () => {

    const { logged} = useSelector(state=>state.log)
    const { categoryId } = useParams()
    const { data, loading, error} = useGetData(categoryPlaylistUrl(categoryId), logged, false)
    const {data:category}=useGetData(categoryUrl(categoryId),logged, false)

  return (

    <DetailViewContainer>
      <h1 className="search-browse-title">
        {category?.name}
      </h1>
      {loading&& <Loader height="24rem"/>}
      {error&&<Info msn={`Error ${error?.status}: ${error?.message}`}/>}
        <GridContainer categoryView={true}>
        {(data?.playlists.items.length===0)?
        <Info/>
        :data?.playlists.items.filter(item=>item!==null).map(item=>{
                return(
                  <Card
                    key={item.id}
                    path={'/playlist/' + item.id}
                    uri={item.uri}
                    name={cutTextString(item.name, 30)}
                    author={cutTextString(item.description, 48)}
                    imgUrl={item.images[0].url}
                  />)}
        )}
        </GridContainer>
    </DetailViewContainer>
  )
}
