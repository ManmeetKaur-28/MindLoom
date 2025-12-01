import React from "react";
import { useId, forwardRef } from "react";

function Input(
  { type = "text", label, className = "", labelClass = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`flex flex-col space-y-2 w-full max-w-md mx-auto my-2 `}>
      {label && (
        <label
          className={`text-white font-semibold tracking-wide px-3 ${labelClass}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        {...props}
        className={`w-full px-4 py-2 rounded-md bg-white/10 text-gray-100 placeholder-gray-400 
           border border-indigo-400/60 focus:border-indigo-500 focus:ring-2 
           focus:ring-indigo-400/70 outline-none transition-all duration-200 ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
