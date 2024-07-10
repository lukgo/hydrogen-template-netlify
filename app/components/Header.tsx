import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import logo from '../styles/assets/up&goLogo.webp';
import cartIcon from '../styles/assets/cartIcon.svg';
import clsx from 'clsx';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header
      className={clsx(
        'header transition-height ease sticky top-0 z-50 flex h-[4.5rem] w-full duration-300 lg:h-[5.25rem]',
      )}
      style={{boxShadow: '0px 0px 12.8px 0px #00000040'}}
    >
      <NavLink
        prefetch="intent"
        to="/"
        className="h-[6rem]"
        style={activeLinkStyle}
        end
      >
        <img className="h-full mt-4" src={logo} />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <HeaderCtas cart={cart} />
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
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;
  const twClasses = ``;

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  const baseUrl = 'https://plantwellliving.com';
  const menuItems = [
    {
      label: 'products',
      url: `${baseUrl}/products`,
    },
    {
      label: 'ingredients',
      url: `${baseUrl}/ingredients`,
    },
    {
      label: 'faq',
      url: `${baseUrl}/faq`,
    },
  ];

  return (
    <nav role="navigation" className="flex h-full">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
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
              class="h-full min-w-4 content-center border-b-2 border-transparent px-[2.75rem] p-xl-style text-navigation-foreground no-underline hover:border-border hover:no-underline"
            >
              {item.label}
            </Button>
          </li>
        );
      })}
    </nav>
  );
}

function Button({
  children,
  variant,
  href,
  class: className,
  target,
}: {
  children: React.ReactNode;
  variant: 'link' | 'ghost';
  href?: string;
  class?: string;
  target?: string;
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

  return <button className={buttonClasses}>{children}</button>;
}

function HeaderCtas({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function CartBadge({count}: {count: number}) {
  return (
    <a className="flex" href="#cart-aside">
      <img src={cartIcon} />
      {count}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
