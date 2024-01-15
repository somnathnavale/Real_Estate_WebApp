const Tooltip = ({ children, message, classes }) => {
  return (
    <div className="group relative flex">
      {children}
      <span
        className={`absolute top-5 scale-0 transition-all rounded bg-slate-600 p-2 text-sm text-white group-hover:scale-100 inline-block w-60 right-0 sm:right-auto ${classes} z-10`}
      >
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
