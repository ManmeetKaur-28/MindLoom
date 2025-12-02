import React, { useState } from "react";
import { Input, Logo, Button } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import axios from "axios";
import { BASE_URL } from "../../import";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const userLogin = async (data, e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(login());
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="bg-black my-4 p-4 border-indigo-500/80 border-2 w-1/2 sm:w-2/3 min-w-[300px] max-w-[600px] mx-auto">
      <div className=" flex flex-col justify-around align-middle space-y-2 w-full max-w-md mx-auto my-2">
        <Logo />
        <h1 className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent tracking-wide text-2xl pt-3 pb-1 inline-block text-center">
          Welcome Back, Quiz Master !
        </h1>
        <p className="text-white inline-blocks text-center">
          Ready to challenge your mind?
        </p>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
      </div>
      <div>
        <form onSubmit={handleSubmit(userLogin)}>
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email : "
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password : "
            {...register("password", { required: true })}
          />
          <div className="flex justify-center my-4">
            <Button
              className="
                hover:bg-purple-500/80  hover:border-purple-400"
              type="submit"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
      <div>
        <p className="text-gray-500 text-center">
          New to MindLoom ?{" "}
          <Link className="text-indigo-400" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
