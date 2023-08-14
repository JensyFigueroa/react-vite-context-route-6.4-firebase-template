import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"


const LayoutRoot = () => {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default LayoutRoot