import { useContext } from "react"
import { browseUrl } from "../../api/endpoints"
import { authContext } from "../../context/authContext"
import { useGetData } from "../../hooks/useGetData"
import { ColorCard } from "../ColorCard"
import { GridContainer } from "../GridContainer"

export const BrowserView = () => {
    const { loggedIn, user } = useContext(authContext)
    const { data: browse, loading: browseLoading, error: browseError } = useGetData(browseUrl, loggedIn, false)

    return (
        <GridContainer>
            {browse?.categories.items.map(category => {
                return (
                    <ColorCard
                        key={category.id}
                        title={category.name}
                        imgUrl={category.icons[0].url}
                    />
                )
            })}


        </GridContainer>

    )
}
