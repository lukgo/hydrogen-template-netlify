import {Button} from './Button';
import TikTokIcon from '~/styles/assets/tiktokIcon.svg';
import YouTubeIcon from '~/styles/assets/youtubeIcon.svg';
import InstagramIcon from '~/styles/assets/instagramIcon.svg';
import FacebookIcon from '~/styles/assets/facebookIcon.svg';

export function SocialMediaLinks() {
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
    <div className="ml-auto flex flex-row gap-3">
      {socialMediaData.map((item) => (
        <Button
          variant="link"
          href={item.url}
          className="h-auto px-2"
          target="_blank"
        >
          <img src={item.icon} />
        </Button>
      ))}
    </div>
  );
}
