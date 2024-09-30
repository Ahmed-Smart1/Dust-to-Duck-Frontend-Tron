import Image from 'next/image';

import TelegramImage from '@/assets/images/telegram.png';
import TwitterImage from '@/assets/images/twitter.png';
import FacebookImage from '@/assets/images/facebook.png';
import InstagramImage from '@/assets/images/istagram.png';
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK
} from '@/config/constant';

const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center bg-[#B3111D] text-black">
      <div className="flex gap-[18px] pb-[10px] pt-[40px]">
        <a href={TELEGRAM_LINK}>
          <Image
            className="h-[41px] w-[41px]"
            alt="Telegram"
            src={TelegramImage}
          />
        </a>
        <a href={TWITTER_LINK}>
          <Image
            className="h-[41px] w-[41px]"
            alt="Twitter"
            src={TwitterImage}
          />
        </a>
        <a href={FACEBOOK_LINK}>
          <Image
            className="h-[41px] w-[41px]"
            alt="Facebook"
            src={FacebookImage}
          />
        </a>
        <a href={INSTAGRAM_LINK}>
          <Image
            className="h-[41px] w-[41px]"
            alt="Instagram"
            src={InstagramImage}
          />
        </a>
      </div>
      <div className="p-[10px] text-center font-bold">
        Copyright ©2024 The TRONBull. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
