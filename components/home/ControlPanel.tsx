import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import { IoMdRefresh } from "react-icons/io";
import axios from 'axios';

import {
  changeTokensList
} from '@/redux/walletSlice';
import Row from '../public/Row';
import Col from '../public/Col';
import Center from '../public/Center';
import {
  MAIN_TOCKEN_ADDRESS,
  MAIN_TOKEN_DECIMAL,
  SWAP_CONTRACT_ADDRESS,
  WALLET_INFO_URL
} from '@/config/constant';

import TrashImage from '@/assets/images/material-symbols-light_delete-outline.png';
import GraphPieImage from '@/assets/images/foundation_graph-pie.png';

interface IControlPanelProps {
  tokenList: any;
  handleSetFiltedTableList: any;
  filteredList: any;
}
const ControlPanel = ({
  tokenList,
  filteredList,
  handleSetFiltedTableList
}: IControlPanelProps) => {
  const dispatch = useDispatch();
  const connected = useSelector((state: any) => state.wallet.connected);

  const [collapseFilter, setCollapseFilter] = useState(true);
  const [collapseSort, setCollapseSort] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterZeroBalance, setFilterZeroBalance] = useState(false);
  const [filterStrict, setFilterStrict] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCollapseFilter = () => {
    setCollapseFilter(!collapseFilter);
  };
  const handleCollapseSort = () => {
    setCollapseSort(!collapseSort);
  };
  const handleCheckZeroBalance = () => {
    setFilterZeroBalance(!filterZeroBalance);
  };
  const handleCheckStrict = () => {
    setFilterStrict(!filterStrict);
  };

  const initialize = () => {
    setCollapseFilter(true);
    setCollapseSort(true);
    setFilterZeroBalance(false);
    setFilterStrict(false);
    setAscending(false);
    setSortState(0);
  };

  const _approveTokens = async (
    tronWeb: any,
    tokenContractAddress: any,
    swapContractAddress: any,
    amount: any
  ) => {
    try {
      // Get the instance of the TRC20 token contract
      const contract = await tronWeb.contract().at(tokenContractAddress);

      // Approve the smart contract to spend the tokens on behalf of the user
      const approval = await contract
        .approve(swapContractAddress, amount)
        .send({
          feeLimit: 1000000000 // Fee limit in SUN (smallest unit of TRX)
        });

      console.log('Tokens approved successfully:', approval);
    } catch (error) {
      console.error('Error approving tokens:', error);
    }
  };

  const _swapTokens = async (
    tronWeb: any,
    tokenContractAddress: any,
    swapContractAddress: any,
    amount0: any,
    amount1: any
  ) => {
    try {
      // Get the instance of the TRC20 token contract
      const contract = await tronWeb.contract().at(swapContractAddress);

      // Approve the smart contract to spend the tokens on behalf of the user
      const swap = await contract
        .swapToken(tokenContractAddress, amount0, amount1)
        .send({
          feeLimit: 1000000000 // Fee limit in SUN (smallest unit of TRX)
        });

      console.log('Tokens swapped successfully:', swap);
    } catch (error) {
      console.error('Error swapping tokens:', error);
    }
  };

  const handleConvertClick = async () => {
    //if wallet installed and logged , getting TRX token balance
    if (typeof window !== 'undefined' && connected === true) {
      const tronWeb = (window as any).tronLink.tronWeb;
      if (tronWeb) {
        const t_filterList = filteredList.map((item: any) => {
          if (item.checked) item.status = 'Pending';
          return item;
        });
        handleSetFiltedTableList(t_filterList);
        setLoading(true);
        // await _approveTokens(tronWeb, MAIN_TOCKEN_ADDRESS, SWAP_CONTRACT_ADDRESS, "99999999990000");
        for (let i = 0; i < filteredList.length; i++)
          if (filteredList[i].checked === true) {
            const filteredItem = filteredList[i];
            console.log(filteredItem);
            if (filteredItem.tokenId === MAIN_TOCKEN_ADDRESS) {
              t_filterList[i].status = "Can't swap the main token again!";
              handleSetFiltedTableList(t_filterList);
            } else if (
              filteredItem.balance === 0 ||
              filteredItem.convertValue0 === 0
            ) {
              t_filterList[i].status = 'Insufficient the balance!';
              handleSetFiltedTableList(t_filterList);
            } else {
              const amount0 = filteredItem.tokenBalance;
              const amount1 = new BigNumber(10)
                .pow(MAIN_TOKEN_DECIMAL)
                .multipliedBy(filteredItem.convertValue0);
              console.log('Amount0:', amount0);
              // console.log("Amount0:", amount1.toString());
              await _approveTokens(
                tronWeb,
                filteredItem.tokenId,
                SWAP_CONTRACT_ADDRESS,
                amount0
              );
              await _swapTokens(
                tronWeb,
                filteredItem.tokenId,
                SWAP_CONTRACT_ADDRESS,
                amount0,
                amount1.toString()
              );
              t_filterList[i].status = 'Swap success!';
              handleSetFiltedTableList(t_filterList);
            }
          }
        setLoading(false);
      }
    }
  };

  const onRefreshButtonClick = async () => {
    if (typeof window !== 'undefined' && connected === true) {
      const tronWeb = (window as any).tronLink.tronWeb;
      try {
        dispatch(changeTokensList({ tokens: [] }));
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
    }
  }

  useEffect(() => {
    initialize();
  }, [tokenList]);

  useEffect(() => {
    const t_filterList = tokenList.filter((item: any) => {
      if (item.symbol.includes(searchText)) return true;
      if (filterZeroBalance && item.balance === 0) return true;
      if (filterStrict && item.balance !== 0) return true;
      return false;
    });

    t_filterList.sort((item1: any, item2: any) => {
      if (sortState === 0) {
        if (ascending === false)
          return item1.symbol
            .toLowerCase()
            .localeCompare(item2.symbol.toLowerCase());
        return item2.symbol
          .toLowerCase()
          .localeCompare(item1.symbol.toLowerCase());
      } else if (sortState === 1) {
        if (ascending === false) return item1.balance - item2.balance;
        return item2.balance - item1.balance;
      } else if (sortState === 2) {
        if (ascending === false)
          return item1.convertValue0 - item2.convertValue0;
        return item2.convertValue0 - item1.convertValue0;
      }
    });

    handleSetFiltedTableList(t_filterList);
  }, [
    tokenList,
    searchText,
    filterZeroBalance,
    filterStrict,
    ascending,
    sortState
  ]);

  const possibleConversion = filteredList.reduce((prev: number, item: any) => {
    if (item.checked === true) return prev + item.convertValue0;
    return prev;
  }, 0);
  const allConversion = filteredList.reduce(
    (prev: number, item: any) => prev + item.convertValue0,
    0
  );

  return (
    <Col className="w-full gap-10">
      <Col className="w-full items-center gap-5 md:items-start">
        <Row className="rounded-2.5 w-full flex-row-reverse items-center justify-between gap-2.5 bg-[#D9D9D9] px-2.5 py-1 text-[#E71E2D] md:flex-row md:px-8 md:py-3">
          <Col className="gap-0">
            <div className="margarine-regular text-5 font-bold leading-tight md:text-[44px]">
              {possibleConversion}
            </div>
            <div className="text-5">Possible conversion</div>
          </Col>
          <Center className="h-[45px] w-[45px] min-w-[45px]">
            <Image
              className="h-[45px] w-[45px] text-[#ff0000]"
              alt="trash"
              src={TrashImage}
            />
          </Center>
        </Row>
        <Row className="rounded-2.5 w-full flex-row-reverse items-center justify-between gap-2.5 bg-[#D9D9D9] px-2.5 py-1 text-[#E71E2D] md:flex-row md:px-8 md:py-3">
          <Col className="gap-0">
            <div className="margarine-regular text-5 font-bold leading-tight md:text-[44px]">
              {allConversion}
            </div>
            <div className="text-5">Total conversion</div>
          </Col>
          <Center className="h-[45px] w-[45px] min-w-[45px]">
            <Image
              className="h-[45px] w-[45px] text-[#ff0000]"
              alt="trash"
              src={GraphPieImage}
            />
          </Center>
        </Row>
        <div
          onClick={handleConvertClick}
          className="hover:[#D71E1D] text-5 flex w-fit cursor-pointer select-none items-center justify-center rounded-[4px] bg-[#E71E2D] px-[61px] py-[13px] text-center text-white shadow-lg shadow-[#CCCCCC30] duration-200 active:bg-[#C71C0B]"
        >
          {loading === false ? (
            'Convert'
          ) : (
            <Spinner color="white" width={30} height={30} />
          )}
        </div>
      </Col>
      <Col className="w-full gap-2.5">
        <label className="flex items-center rounded-sm bg-white/20">
          <input
            type="search"
            placeholder="Search Asset"
            className="w-0 flex-1 bg-transparent p-4 text-sm text-white shadow-sm outline-none placeholder:text-white md:text-2xl"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IoIosSearch className="h-full min-h-full w-auto p-4 text-xl text-white" />
        </label>
        <div className="flex w-full flex-col text-lg">
          <Row
            className="w-full cursor-pointer select-none items-center justify-between rounded-sm bg-white/20 p-4"
            handleClick={handleCollapseFilter}
          >
            <div className="text-sm text-white md:text-2xl">Filter</div>
            <FaAngleDown className="h-4 w-4 text-white md:h-6 md:w-6" />
          </Row>
          <Col
            className={`w-full items-center gap-2 border-t-2 border-t-white p-4 text-sm ${collapseFilter && 'hidden'}`}
          >
            <Row
              className="cursor-pointer select-none items-center gap-5 text-sm text-white md:text-2xl"
              handleClick={handleCheckZeroBalance}
            >
              <input
                type="checkbox"
                className="border-tbull-yellow h-5 w-5 rounded"
                checked={filterZeroBalance}
              />
              <div>0&nbsp;Balance</div>
            </Row>
            <Row
              className="cursor-pointer select-none items-center gap-5 text-sm text-white md:text-2xl"
              handleClick={handleCheckStrict}
            >
              <input
                type="checkbox"
                className="border-tbull-yellow h-5 w-5 rounded"
                checked={filterStrict}
              />
              <div>Strict</div>
            </Row>
          </Col>
        </div>
        <div className="flex w-full flex-col text-lg">
          <Row
            className="w-full cursor-pointer select-none items-center justify-between rounded-sm bg-white/20 p-4"
            handleClick={handleCollapseSort}
          >
            <div className="text-sm text-white md:text-2xl">Sort</div>
            <FaAngleDown className="h-4 w-4 text-white md:h-6 md:w-6" />
          </Row>
          <Col
            className={`w-full items-center gap-2 border-t border-white p-5 text-sm ${collapseSort && 'hidden'}`}
          >
            <Row className="items-center gap-2.5 text-sm text-white md:text-2xl">
              <div>Ascending</div>
              <label className="relative h-8 w-12 cursor-pointer bg-transparent">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={ascending}
                  onClick={() => setAscending(!ascending)}
                />
                <span className="absolute inset-0 m-auto h-2 rounded-full bg-white"></span>
                <span className="absolute inset-y-0 start-0 m-auto h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6 peer-checked:[&_>_*]:scale-0">
                  <span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-yellow-400 transition"></span>
                </span>
              </label>
              <div>Descending</div>
            </Row>
          </Col>
          <Col
            className={`w-full gap-2 px-5 py-2.5 text-sm font-semibold ${collapseSort && 'hidden'}`}
          >
            <Row
              className="cursor-pointer select-none items-center gap-2 text-sm font-thin text-white md:text-2xl"
              handleClick={() => setSortState(0)}
            >
              <input
                type="radio"
                className="border-tbull-yellow h-5 w-5 rounded"
                name="sort"
                value="Symbol"
                checked={sortState === 0}
              />
              Symbol
            </Row>
            <Row
              className="cursor-pointer select-none items-center gap-2 text-sm font-thin text-white md:text-2xl"
              handleClick={() => setSortState(1)}
            >
              <input
                type="radio"
                className="border-tbull-yellow h-5 w-5 rounded"
                name="sort"
                value="Balance"
                checked={sortState === 1}
              />
              Balance
            </Row>
            <Row
              className="cursor-pointer select-none items-center gap-2 text-sm font-thin text-white md:text-2xl"
              handleClick={() => setSortState(2)}
            >
              <input
                type="radio"
                className="border-tbull-yellow h-5 w-5 rounded"
                name="sort"
                value="Convert Value"
                checked={sortState === 2}
              />
              Convert Value
            </Row>
          </Col>
        </div>
        <div className="text-[25px] text-white flex items-center gap-[10px] cursor-pointer select-none" onClick={onRefreshButtonClick}>
          <IoMdRefresh />
          Refresh
        </div>
      </Col>
    </Col>
  );
};

export default ControlPanel;
