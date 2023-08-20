import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //DESESTRUCTURAMOS EL FORM
  const { email, password } = form;

  const { user } = useUserContext();

  //usamos el hook que se creo para useRedirectActiveUser al usuario
  useRedirectActiveUser(user, "/dashboard");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentialUser = await register({ email, password });
      console.log(credentialUser);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const credentialUser = await register({ email, password });
      console.log(credentialUser);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      if (error.code === "auth/invalid-email")
        return setErrors({ email: "Invalid email" });
      if (error.code === "auth/weak-password")
        return setErrors({ password: "Password should be at least 6" });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid Email")
      .required("Email requered"),
    password: Yup.string()
      .trim()
      .min(6, "Min characters")
      .required("Password requered"),
  });

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button type="submit">Register</button>
      </form>
      <hr />

      <Box sx={{ mt: 5, maxWidth: "800px", mx: "auto", textAlign: "Center" }}>
        <h1>Regiter with Formik and Yup</h1>

        <Avatar sx={{ mx: "auto", bgcolor: "#111", mb: 1 }}>
          <HowToRegIcon />
        </Avatar>

        <Typography variant={"h5"} component={"h1"} sx={{ mb: 2 }}>
          Register
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <Box
              onSubmit={handleSubmit}
              component={"form"}
              sx={{ maxWidth: "500px", mx: "auto", mt: "5" }}
            >
              <TextField
                id="email"
                type="text"
                label="Enter email"
                placeholder="email@example.com"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                fullWidth
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                sx={{ mb: 1 }}
              />
              {/* {errors.email && touched.email && errors.email} */}
              <TextField
                id="password"
                type="password"
                label="Enter password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                fullWidth
                error={errors.password && touched.password}
                helperText={errors.password && touched.password && errors.password}
                sx={{mb:1}}
              />
              {/* {errors.password && touched.password && errors.password} */}
         
              <LoadingButton type="submit" disabled={isSubmitting} loading={isSubmitting} variant='contained' fullWidth>
                Register
              </LoadingButton>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
