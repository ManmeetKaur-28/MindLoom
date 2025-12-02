import React from "react";
import { Button, Input, Logo } from "../index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../import";

function Signup() {
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userSignup = async (data, e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="bg-black p-4 my-4 border-indigo-500/80 border-2 w-1/2 sm:w-2/3 min-w-[300px] max-w-[600px] mx-auto">
      <div className=" flex flex-col justify-around align-middle space-y-2 w-full max-w-md mx-auto my-2">
        <Logo />
        <h1 className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent tracking-wide text-2xl pt-3 pb-1 inline-block text-center">
          Welcome, Brilliant Mind !
        </h1>
        <p className="text-white inline-blocks text-center">
          New here? Let’s make every quiz count!
        </p>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div>
        <form onSubmit={handleSubmit(userSignup)}>
          <Input
            type="text"
            placeholder="Enter your name"
            label="Full Name : "
            {...register("fullname", { required: true })}
          />
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
                hover:bg-purple-500/80 hover:border-purple-400"
              type="submit"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
      <div>
        <p className="text-gray-500 text-center">
          Already have an account ?{" "}
          <Link className="text-indigo-400" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
