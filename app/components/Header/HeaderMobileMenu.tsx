import {SocialMediaLinks} from '../ui';

export function HeaderMobileMenu({
  menuOpen,
  menuItems,
}: {
  menuOpen: boolean;
  menuItems: {label: string; url: string}[];
}) {
  return (
    <div
      className={`fixed left-0 right-0 top-[4.5rem] h-[calc(100dvh-4.5rem)] transform-gpu bg-navigation-sub-menu transition-transform duration-300 ease-in-out lg:hidden ${
        menuOpen ? 'translate-y-0' : '-translate-y-[110%]'
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <ul className="h-full">
          {menuItems.map((menuItem) => (
            <li className="border-b border-navigation-border/50">
              <a
                href={menuItem.url}
                target="_self"
                className="flex flex-1 items-center justify-between px-4 py-8"
              >
                <span className="text-navigation-foreground p-xl-style">
                  {menuItem.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-row gap-6 px-4 py-6">
          <SocialMediaLinks className="ml-0" />
        </div>
      </div>
    </div>
  );
}
