'use client';

import Image from 'next/image';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '@/redux/store';
import { useSelector } from 'react-redux';

import MainSection from './MainSection';
import TRC20DataSection from './TRC20DataSection';
import Footer from './Footer';

import { Macondo } from 'next/font/google';
import Header from './Header';

import BullImage from '@/assets/images/bull.png';

const macondo = Macondo({ weight: '400', subsets: ['latin'] });

const HomePageWithProvider = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

const HomePage = () => {
  const connected = useSelector((state: any) => state.wallet.connected);

  return (
    <div className="relative">
      <Header />
      <MainSection />
      <Image
        className="z-200 absolute w-[150px] translate-y-[-50%] transform md:w-[343px]"
        alt="Bull"
        src={BullImage}
      />
      <TRC20DataSection />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default HomePageWithProvider;
