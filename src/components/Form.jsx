import { useState } from "react";

// const initialState = {text: 'initial State'}

const Form = ({ children, initialState, onSubmit }) => {
  /* Formik */
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checked" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return children({ values, handleChange, handleSubmit });
};

export default Form;
