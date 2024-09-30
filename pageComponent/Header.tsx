import Image from 'next/image';
import ConnectWallet from '@/components/header/ConnectWallet';
import MarkImage from '@/assets/images/mark_home.png';
import CloudImage from '@/assets/images/cloud_home.png';

const Header = () => {
  return (
    <div className="fixed z-10 grid w-full items-center justify-between gap-4 bg-[#b3111d]/80 px-4 py-2 backdrop-blur-lg max-md:grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr]">
      <div className="flex h-full">
        <Image
          className="aspect-square h-16 w-auto"
          alt="Mark"
          src={MarkImage}
        />
      </div>
      <div>
        <ConnectWallet />
      </div>
      <div className="max-md:hidden">
        <Image
          className="ml-auto aspect-[1.39] h-20 w-auto scale-[200%]"
          alt="Cloud"
          src={CloudImage}
        />
      </div>
    </div>
  );
};

export default Header;
