import React, { useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/v1/user/login";
      const { data: res } = await Axios.post(url, data);

      // Ensure the response structure is as expected
      console.log("API Response:", res);

      // Assuming res.data contains the token
      localStorage.setItem("token", res.data);
      navigate("/dashboard"); // Changed from "/signup" to "/dashboard" for a typical flow
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={style.login_Container}>
      <div className={style.login_from_Container}>
        <div className={style.right}>
          <form className={style.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={style.input}
            />
            {error && <div className={style.errorMsg}>{error}</div>}
            <button type="submit" className={style.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={style.left}>
          <h1>New here?</h1>
          <Link to="/signup">
            <button type="button" className={style.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
