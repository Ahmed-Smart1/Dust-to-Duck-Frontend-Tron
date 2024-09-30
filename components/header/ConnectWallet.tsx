import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  changeExistStatus,
  changeConnectStatus,
  changeTokensList
} from '@/redux/walletSlice';
import { shortenAddress } from '@/config/utils';
import Center from '../public/Center';
import { WALLET_INFO_URL } from '@/config/constant';
import WalletIcon from '@/assets/images/walletIco.png';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const existed = useSelector((state: any) => state.wallet.existed);
  const connected = useSelector((state: any) => state.wallet.connected);

  const [address, setAddress] = useState('');

  const getTRC20TokenInfo = async (tronWeb: any) => {
    try {
      const result = await axios.get(
        `${WALLET_INFO_URL}${tronWeb.defaultAddress.base58}`
      );
      const trc20s = result.data.data.slice(1);
      console.log(trc20s);
      dispatch(changeTokensList({ tokens: trc20s }));
      return trc20s;
    } catch (err) {
      return [];
    }
  };

  const getBalance = async () => {
    //if wallet installed and logged , getting TRX token balance
    if (typeof window !== 'undefined' && connected === true) {
      const tronWeb = (window as any).tronLink.tronWeb;
      setAddress(tronWeb.defaultAddress.base58);
      if (tronWeb) {
        const walletBalances = await tronWeb.trx.getAccount(
          tronWeb.defaultAddress.base58
        );
        console.log('balance', walletBalances);
        await getTRC20TokenInfo(tronWeb);
        return walletBalances;
      } else {
        return 0;
      }
    }
  };

  const isTronLinkExisted = async () => {
    if (typeof window !== 'undefined') {
      const tronLink = (window as any).tronLink;
      if (tronLink) {
        dispatch(changeExistStatus({ existed: true }));
        console.log('Ready', tronLink.ready);
        if (tronLink.ready === true) {
          dispatch(changeConnectStatus({ connected: true }));
        } else dispatch(changeConnectStatus({ connected: false }));
      } else {
        dispatch(changeExistStatus({ existed: false }));
      }
    }
  };

  const handleWalletClick = async () => {
    if (typeof window !== 'undefined' && existed === true) {
      console.log('HEREH');
      const tronLink = (window as any).tronLink;
      const result_accounts = await tronLink.request({
        method: 'tron_requestAccounts'
      });
      if (result_accounts === '') {
        toast.warn('Please unlock your wallet', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        dispatch(changeConnectStatus({ connected: false }));
      } else {
        dispatch(changeConnectStatus({ connected: true }));
        tronLink.tronWeb;
      }
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      isTronLinkExisted();
    }, 500);
  }, []);

  useEffect(() => {
    getBalance();
  }, [connected]);

  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-solid border-white bg-black px-4 py-2 text-white"
      onClick={handleWalletClick}
    >
      {existed === false
        ? 'NO DETECT TRONLINK WALLET'
        : connected === false
          ? 'CONNECT WALLET'
          : shortenAddress(address)}
      <Image className="h-[2em] w-auto" alt="wallet icon" src={WalletIcon} />
    </div>
  );
};

export default ConnectWallet;
