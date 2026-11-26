function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none cursor-pointer";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg",

    secondary:
      "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100",

    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 rounded-lg text-sm",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 rounded-xl text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;