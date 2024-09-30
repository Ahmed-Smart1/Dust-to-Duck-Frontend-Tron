const Col = ({
  padding = '',
  justify = 'auto',
  children,
  className,
  handleClick
}: any) => (
  <div
    className={`w-full ${padding} flex flex-col justify-${justify} ${className}`}
    onClick={handleClick}
  >
    {children}
  </div>
);

export default Col;
