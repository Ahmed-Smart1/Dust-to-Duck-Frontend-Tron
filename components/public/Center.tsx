const Center = ({ children, className, handleClick }: any) => (
  <div
    className={`flex items-center justify-center ${className}`}
    onClick={handleClick}
  >
    {children}
  </div>
);

export default Center;
