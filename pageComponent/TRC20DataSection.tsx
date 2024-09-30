import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TRC20Table from '@/components/home/TRC20Table';
import ControlPanel from '@/components/home/ControlPanel';
import {
  BASE_PRICE,
  MAIN_TOCKEN_ADDRESS,
  TRC20_INFO_URL
} from '@/config/constant';
import axios from 'axios';

import ConvertAnimalImage from '@/assets/images/convert_animal.png';
import BullImage from '@/assets/images/bull.png';

const TRC20DataSection = () => {
  const connected = useSelector((state: any) => state.wallet.connected);
  const tokens = useSelector((state: any) => state.wallet.tokens);

  const [tableList, setTableList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const getMainTokenPriceInTrx = async () => {
    try {
      const result = await axios.get(`${TRC20_INFO_URL}${MAIN_TOCKEN_ADDRESS}`);
      let price =
        result.data.trc20_tokens[0].market_info === undefined
          ? BASE_PRICE
          : result.data.trc20_tokens[0].market_info.priceInTrx;
      console.log('price', price);
      return price;
    } catch (err) {
      return 1;
    }
  };

  useEffect(() => {
    (async () => {
      if (connected === true) {
        const mainTokenPriceInTrx = await getMainTokenPriceInTrx();
        const t_tableList = tokens.map((token: any) => {
          const tokenPriceInTrx =
            token.tokenPriceInTrx === undefined ? 0 : token.tokenPriceInTrx;
          return {
            checked: false,
            symbol: token.tokenAbbr,
            balance: token.quantity,
            convertValue0: Math.round(
              (tokenPriceInTrx * token.quantity) / mainTokenPriceInTrx
            ),
            convertValue1: tokenPriceInTrx * token.quantity,
            fee: Math.round(
              ((tokenPriceInTrx * token.quantity) / mainTokenPriceInTrx) * 0.01
            ),
            tokenList: '',
            status: 'Normal',
            tokenId: token.tokenId,
            decimal: token.tokenDecimal,
            tokenBalance: token.balance
          };
        });
        setTableList(t_tableList);
        setFilteredList(t_tableList);
      }
    })();
  }, [tokens]);

  return (
    <>
      <div className="w-full bg-[#110F10] px-5 pb-5 max-md:px-12 max-md:pt-12 md:px-24 md:pt-20 lg:px-40">
        <div className="flex w-full flex-col-reverse gap-[12px]">
          <TRC20Table
            tableList={filteredList}
            handleChangeTable={setTableList}
          />
        </div>
      </div>
      <div
        className="relative h-fit w-[100%] bg-[#110F10] bg-[url('../assets/images/convert_back.png')] px-12 pb-[150px] sm:px-10 md:h-[100vh] md:px-40 md:pb-[0px]"
        style={{ backgroundSize: 'auto 100%' }}
      >
        <Image
          className="absolute bottom-[36px] right-[50%] w-[50%] translate-x-[50%] sm:w-[28%] md:right-[50px] md:translate-x-0"
          alt="Animal"
          src={ConvertAnimalImage}
        />
        <Image
          className="z-100 absolute right-[10%] top-[2%] hidden w-[343px] lg:block"
          alt="Bull"
          src={BullImage}
        />
        <div className="flex w-full flex-col-reverse gap-[12px] max-md:pb-12 max-md:pt-4 md:w-[500px] md:py-12">
          <ControlPanel
            tokenList={tableList}
            filteredList={filteredList}
            handleSetFiltedTableList={setFilteredList}
          />
        </div>
      </div>
    </>
  );
};

export default TRC20DataSection;
