import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import {useUserContext} from '../context/UserContext'

const Login = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email:'',
        password:''
    })

    //DESESTRUCTURAMOS EL FORM
    const {email, password} = form

    const {user} = useUserContext()
    useEffect(() => {
      if(user) navigate('/dashboard')
    }, [user])
    

    const handleChange = (e) => { 
        const {name, value} = e.target

        setForm({...form, [name]:value})
    }
    
    const handleSubmit = async (e) => { 
        e.preventDefault()
        try {
            const credentialUser = await login({email, password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
     }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter email" name="email" onChange={handleChange} value={email}/>
        <input type="password" placeholder="Enter password" name="password" onChange={handleChange} value={password}/>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
