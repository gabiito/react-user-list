interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps): React.ReactElement<ContainerProps> {
  const customClasses = "max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4"
  const classes = (className ? `${className}` : '').split(' ').filter((c) => c.length > 0 || !customClasses.includes(c)).join(' ');
  return (
    <div
      className={`${customClasses} ${classes}`}
      {...props}
    >
      {children}
    </div>
  );
}
