import Image from 'next/image';
import AnimalImage from '@/assets/images/animal_home.png';

const MainSection = () => {
  return (
    <div className="relative grid w-full bg-[rgb(179,17,29)] pb-10 max-md:grid-cols-1 max-md:px-12 max-md:pt-20 md:grid-cols-[2fr_1fr] md:grid-rows-2 md:px-24 md:pt-40 lg:px-40">
      <div className="macondo-regular font-bold leading-tight text-white max-md:text-center max-md:text-[40px] md:text-[60px] lg:text-[80px]">
        Convert unwanted assets into $Tbull
      </div>
      <div className="macondo-regular flex text-center text-white max-md:row-start-3 max-md:mx-auto max-md:mt-4">
        <div className="mb-auto rounded-full bg-gradient-to-bl from-transparent to-red-950 px-8 max-md:py-2 max-md:text-2xl sm:text-left md:mb-auto md:mr-auto md:py-4 md:text-3xl lg:text-[40px] xl:text-[50px]">
          0.69% fee taken from all swaps
        </div>
      </div>
      <div className="flex drop-shadow-sm md:col-start-2 md:row-span-2 md:row-start-1">
        <Image
          className="mx-auto mt-auto w-full"
          alt="Animal"
          src={AnimalImage}
        />
      </div>
    </div>
  );
};

export default MainSection;
