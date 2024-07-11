import clsx from 'clsx';

export function Button({
  children,
  variant,
  href,
  className,
  target,
  onClick,
}: {
  children: React.ReactNode;
  variant: 'link' | 'ghost';
  href?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const buttonClasses = clsx(
    'flex items-center justify-center h-full min-w-4 content-center border-b-2 border-transparent px-[2.75rem] text-xl text-navigation-foreground no-underline hover:border-border hover:no-underline',
    className,
  );

  if (variant === 'link') {
    return (
      <a href={href} target={target} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
