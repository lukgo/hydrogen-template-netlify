import {Await, NavLink} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from '../Layout';
import {useRootLoaderData} from '~/root';
import clsx from 'clsx';
import logo from '~/styles/assets/up&goLogo.webp';
import cartIcon from '~/styles/assets/cartIcon.svg';
import TikTokIcon from '~/styles/assets/tiktokIcon.svg';
import YouTubeIcon from '~/styles/assets/youtubeIcon.svg';
import InstagramIcon from '~/styles/assets/instagramIcon.svg';
import FacebookIcon from '~/styles/assets/facebookIcon.svg';
import {HeaderMobileMenu} from './HeaderMobileMenu';
import {HamburgerToggle} from './HamburgerToggle';

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
        style={activeLinkStyle}
        end
      >
        <img className="h-full mt-4" src={logo} />
      </NavLink>
      <div className="hidden w-full h-full lg:flex">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
        {/* <SocialMediaLinks /> */}
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
                class="h-full min-w-4 content-center border-b-2 border-transparent px-[2.75rem] p-xl-style text-navigation-foreground no-underline hover:border-border hover:no-underline"
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
    <a className="flex " href="#cart-aside">
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

function SocialMediaLinks() {
  const socialMediaData = [
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@upandgo',
      icon: TikTokIcon,
    },
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/channel/UCqU2ZQjJj6k5Jr9zYr6Fv8w',
      icon: YouTubeIcon,
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/upandgo',
      icon: InstagramIcon,
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/upandgo',
      icon: FacebookIcon,
    },
  ];

  return (
    <div className="ml-auto flex flex-row gap-6">
      {socialMediaData.map((item) => (
        <Button
          variant="link"
          href={item.url}
          class="h-auto p-0"
          target="_blank"
        >
          <img src={item.icon} />
        </Button>
      ))}
    </div>
  );
}

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
