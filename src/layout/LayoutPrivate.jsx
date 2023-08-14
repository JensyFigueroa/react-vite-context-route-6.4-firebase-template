import { Outlet } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useEffect } from "react"

const LayoutPrivate = () => {
    const { user } = useUserContext()

    useEffect(() => { 
        
     },[user])
    return (
        <>
            <Outlet />
        </>
    )
}

export default LayoutPrivate