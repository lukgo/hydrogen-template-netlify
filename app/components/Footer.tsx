import logo from '~/styles/assets/up&goLogo.webp';
import {SocialMediaLinks} from './ui';

// TODO move outside and seed from config file
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

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-8 px-4 pb-10 pt-12 lg:px-6">
      <div>
        <img
          src={logo}
          alt="logoAltText"
          title="logoAltText"
          className="inline-block brand-logo-large"
        />
      </div>
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <SocialMediaLinks />
      </div>
      <div>
        <ul className="flex w-full flex-row flex-wrap gap-6">
          {menuItems.map((item) => (
            <li>
              <a
                href={item.url}
                className="block text-base leading-5 underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
        <div>
          <p className="text-xs opacity-60">copyrightText goes here</p>
        </div>
        <p className="text-xs opacity-60">
          Website by{' '}
          <a
            href="https://www.mudbath.com.au/"
            target="_blank"
            className="underline"
          >
            Mudbath
          </a>
        </p>
      </div>
    </footer>
  );
}
