import React from "react";
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RegisterCode() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const goToRegister = (data) => {
    navigate(`/register/${data.joinCode}`);
  };

  return (
    <div className="h-svh bg-linear-to-b from-gray-950 to-indigo-950  px-8 py-10 font-poppins text-white font-poppins  ">
      <div className="bg-indigo-900/30 rounded-3xl p-6 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 w-[95%] md:w-[85%] lg:w-[60%] mx-auto">
        {/* Header */}
        <h1
          className="text-4xl font-bold text-center mb-4 bg-linear-to-r py-1  from-indigo-400 to-pink-400 bg-clip-text text-transparent tracking-wide"
          style={{ fontFamily: "Delius, cursive" }}
        >
          Register
        </h1>
        <div className="h-px w-full bg-indigo-500/40 mb-6"></div>

        {/* Form */}
        <form onSubmit={handleSubmit(goToRegister)} className="space-y-6">
          <Input
            type="text"
            label="Enter Quiz Code"
            placeholder="e.g. ABC123"
            {...register("joinCode", { required: true })}
          />
          <div className="flex justify-center">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterCode;
