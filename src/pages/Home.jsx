import { useNavigate } from "react-router-dom"

const Home = () => {
  const navegate = useNavigate()

  const handleLogin = () => {
    navegate('/login')
  }
  const handleRegister = () => {
    navegate('/register')
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Home