const LinkButton = ({ href, children, className }: any) => {
  return (
    <a
      className={`hover:text-blue flex cursor-pointer items-center no-underline ${className}`}
      href={href}
    >
      {children}
    </a>
  );
};

export default LinkButton;
