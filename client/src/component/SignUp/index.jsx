import React, { useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    age: "",
    email: "",
    number: "",
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
      const url = "http://localhost:8080/api/v1/user/signup";
      const { data: res } = await Axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={style.signup_Container}>
      <div className={style.signup_from_Container}>
        <div className={style.left}>
          <h1>Welcome Back</h1>
          <Link to ="/login">
            <button type="button" className={style.white_btn}>
              Login
            </button>
          </Link>
        </div>
        <div className={style.right}>
          <form className={style.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="text"
              placeholder="Father Name"
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="text"
              placeholder="Number"
              name="number"
              value={data.number}
              onChange={handleChange}
              required
              className={style.input}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={style.input}
            />
            {error && <div className={style.errroMsg}>{error}</div>}
            <button type="submit" className={style.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

