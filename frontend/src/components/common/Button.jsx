import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-500/80",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <div className="w-fit m-2">
      <button
        type={type}
        className={`px-3 py-1 rounded-md font-medium 
                 border border-indigo-400/60
                active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.4)]
                transition-all duration-300 ease-in-out ${className} ${bgColor} ${textColor}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
