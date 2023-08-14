import { useEffect } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  /* ==== 1er Form ==== */
  /*   useEffect(() => { 
          if (!user) {
              navigate('/')
          }
       },[user]) */

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
                    <button onClick={() => setUser(false)}>Log Out</button>
                </> 
            : <Navigate to={'/'}/>}
    </nav>
  );
};

export default NavBar;
