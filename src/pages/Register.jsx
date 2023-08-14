import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../config/firebase";

const Register = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email:'',
        password:''
    })

    //DESESTRUCTURAMOS EL FORM
    const {email, password} = form

    const handleChange = (e) => { 
        const {name, value} = e.target

        setForm({...form, [name]:value})
    }
    
    const handleSubmit = async (e) => { 
        e.preventDefault()
        try {
            const credentialUser = await register({email, password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
        navigate('/dashboard')
     }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter email" name="email" onChange={handleChange} value={email}/>
        <input type="password" placeholder="Enter password" name="password" onChange={handleChange} value={password}/>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;