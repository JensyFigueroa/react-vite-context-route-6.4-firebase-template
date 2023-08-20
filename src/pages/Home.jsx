import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { Formik } from "formik";
import { login } from "../config/firebase";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIco from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

const Home = () => {
  const navegate = useNavigate();

  const handleLogin = () => {
    navegate("/login");
  };
  const handleRegister = () => {
    navegate("/register");
  };

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    // console.log(values)
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      if (error.code === "auth/user-not-found")
        return setErrors({ email: "Invalid User" });

      if (error.code === "auth/wrong-password")
        return setErrors({ password: "Invalid Password" });
    } finally {
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const { user } = useUserContext();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email requered"),
    password: Yup.string()
      .trim()
      .min(6, "Min 6 characters")
      .required("Password requered"),
  });

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>

      <hr />
      <h1>How Formik works </h1>
      <Form
        initialState={{ text: "Desde Home", email: "jensy@test.com" }}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter text"
              value={values.text}
              onChange={handleChange}
              name="text"
            />
            <input
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              name="email"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Form>
      <hr />

      <h1>Using Formik and Yup for Login - Firebase</h1>
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>

      <hr />

      <Box sx={{ mt: 5, maxWidth: "800px", mx: "auto", textAlign: "Center" }}>
        <Typography variant="h3" component={"h1"}>
          {" "}
          Adding Styles with Material UI
        </Typography>

        <Typography variant="h5" component={"h1"}>
          Login
        </Typography>

        <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
          <LockOutlinedIco />
        </Avatar>
        
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
              sx={{ maxWidth: "500px", mt: 3, mx: "auto" }}
              component={"form"}
            >
              <TextField
                id="email"
                type="text"
                label="Enter email"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                fullWidth
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                sx={{ mb: 1 }}
              />
              {/* {errors.email && touched.email && errors.email} se pasa como 2 props*/}

              <TextField
                id="password"
                type="password"
                // placeholder="Enter password"
                label="Enter password"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                fullWidth
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              {/* {errors.password && touched.password && errors.password} */}

              <LoadingButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
              >
                Login
              </LoadingButton>
              {/* <Button type="submit" disabled={isSubmitting}>
                Login
              </Button> */}

              <Button fullWidth component={Link} to={"/register"}>
                Sign Up
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default Home;
