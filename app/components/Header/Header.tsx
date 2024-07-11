import {Await, NavLink} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from '../Layout';
import clsx from 'clsx';
import logo from '~/styles/assets/up&goLogo.webp';
import cartIcon from '~/styles/assets/cartIcon.svg';
import {HeaderMobileMenu} from './HeaderMobileMenu';
import {HamburgerToggle} from './HamburgerToggle';
import {Button} from '../ui/Button';
import {SocialMediaLinks} from '../ui/SocialMediaLinks';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

type Viewport = 'desktop' | 'mobile';

const baseUrl = 'https://upandgo.com.au';
const menuItems = [
  {
    label: 'products',
    url: `${baseUrl}/products`,
  },
  {
    label: 'our story',
    url: `${baseUrl}/ingredients`,
  },
  {
    label: 'merch',
    url: `${baseUrl}/merch`,
  },
  {
    label: 'faq',
    url: `${baseUrl}/faq`,
  },
];

export function Header({header, cart}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {shop, menu} = header;
  return (
    <header
      className={clsx(
        'header transition-height ease sticky top-0 z-50 flex h-[4.5rem] w-full duration-300 lg:h-[5.25rem]',
      )}
      style={{boxShadow: '0px 0px 12.8px 0px #00000040'}}
    >
      <HamburgerToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <NavLink
        prefetch="intent"
        to="/"
        className="h-[6rem] mr-[1.5rem] flex justify-center w-full lg:w-auto z-10"
        end
      >
        <img className="h-full mt-4" src={logo} />
      </NavLink>
      <CartToggle className="lg:hidden" cart={cart} />
      <div className="hidden w-full h-full lg:flex">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        <SocialMediaLinks className="lg:ml-auto" />
        <HeaderCtas cart={cart} />
      </div>
      <HeaderMobileMenu menuOpen={isMenuOpen} menuItems={menuItems} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
}) {
  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav role="navigation" className="flex h-full">
      {viewport === 'mobile' && (
        <NavLink end onClick={closeAside} prefetch="intent" to="/">
          Home
        </NavLink>
      )}
      <ul className="flex">
        {menuItems.map((item, idx) => {
          if (!item.url) return null;

          return (
            <li
              key={`menu-list-item-${idx}`}
              className="flex items-center justify-center"
            >
              <Button
                variant="link"
                href={item.url}
                className="h-full min-w-4 content-center border-b-2 border-transparent px-[2.75rem] p-xl-style text-navigation-foreground no-underline hover:border-border hover:no-underline"
              >
                {item.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HeaderCtas({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <nav className="flex items-center" role="navigation">
      <CartToggle className="pl-12 pr-4" cart={cart} />
    </nav>
  );
}

function CartBadge({count, className}: {count: number; className?: string}) {
  return (
    <a className={clsx('flex', className)} href="#cart-aside">
      <img className="w-[3rem] h-[3rem]" src={cartIcon} />
      <span className="text-xs ml-[-0.5rem]">{count}</span>
    </a>
  );
}

function CartToggle({
  cart,
  className,
}: Pick<HeaderProps, 'cart'> & {className?: string}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge className={className} count={0} />;
          return (
            <CartBadge className={className} count={cart.totalQuantity || 0} />
          );
        }}
      </Await>
    </Suspense>
  );
}
