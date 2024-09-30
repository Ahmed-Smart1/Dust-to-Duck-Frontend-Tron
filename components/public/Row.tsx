const Row = ({
  padding = '',
  justify = 'auto',
  children,
  className,
  handleClick
}: any) => (
  <div
    className={`w-full ${padding} flex justify-${justify} ${className}`}
    onClick={handleClick}
  >
    {children}
  </div>
);

export default Row;
