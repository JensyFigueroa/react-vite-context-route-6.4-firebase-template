import { useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { logout } from "../config/firebase";

const NavBar = () => {
  const { user } = useUserContext();


  /* ==== 1er Form ==== */
  /*   useEffect(() => { 
          if (!user) {
              navigate('/')
          }
       },[user]) */


       const handleLogout = async() => { 
          try {
            await logout()
          } catch (error) {
            console.log(error)
          }
        }

  return (
    <nav className="bg-dark">
      <NavLink to={"/"} className="btn btn-outline-primary">
        Home
      </NavLink>

      {/* ==== 1er Form ====== */}
      {/* {
                user && <>
                    <NavLink to={'/dashboard'} className='btn btn-outline-primary'>Dashboard</NavLink>
                    <button onClick={() => setUser(false)}>Log Out</button>
                </>

            } */}

      {/* ====== 2do Form ====== */}
      {user ? <>
                    <NavLink to={'/dashboard'} className='btn btn-outline-primary'>Dashboard</NavLink>
                    <button onClick={handleLogout}>Log Out</button>
                </> 
            : <Navigate to={'/'}/>}
    </nav>
  );
};

export default NavBar;
