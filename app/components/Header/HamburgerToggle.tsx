import clsx from 'clsx';

export function HamburgerToggle({
  isMenuOpen,
  setIsMenuOpen,
  backgroundColor = 'bg-navigation-foreground',
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  backgroundColor?: string;
}) {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isMenuOpen}
      className="flex cursor-pointer flex-col items-center justify-center transition-transform duration-500 relative lg:hidden"
      style={{width: '1.5rem', height: '1.5rem'}}
      type="button"
      title="hamburger button"
    >
      <span
        className={clsx(
          `${backgroundColor} absolute h-[0.15rem] w-full rounded-full transition-all duration-300 ease-burger-transition ${
            isMenuOpen ? 'top-[50%] -rotate-45' : 'top-[40%]'
          }`,
        )}
      ></span>
      <span
        className={clsx(
          `${backgroundColor} absolute h-[0.15rem] w-full rounded-full transition-all duration-300 ease-burger-transition ${
            isMenuOpen ? 'top-[50%] rotate-45' : 'top-[60%]'
          }`,
        )}
      ></span>
    </button>
  );
}
