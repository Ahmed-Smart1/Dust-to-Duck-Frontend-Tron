// import Row from "../public/Row";
import { useState } from 'react';
import Col from '../public/Col';
import { MAIN_TOCKEN_ADDRESS } from '@/config/constant';

const TRC20Table = ({ tableList, handleChangeTable }: any) => {
  const [allCheck, setAllCheck] = useState(false);

  const handleClick = (index: number, tick: number) => {
    if (tableList[index].checked === true) setAllCheck(false);
    const t_tableList = tableList.map((item: any) => {
      if (item.tokenId !== tick) return item;
      else {
        item.checked = !item.checked;
        return item;
      }
    });
    handleChangeTable(t_tableList);
  };
  const handleAllClick = () => {
    const t_tableList = tableList.map((item: any) => {
      item.checked = !allCheck;
      return item;
    });
    setAllCheck(!allCheck);
    handleChangeTable(t_tableList);
  };

  return (
    <Col className="h-fit min-h-[300px] gap-[10px] overflow-auto rounded-[10px] bg-[#F7E9E960] px-[15px] py-[15px] text-white md:min-h-[500px] md:px-[29px] md:py-[36px]">
      <table className="h-[100%] border-collapse">
        <thead>
          <tr
            className="hover:td:bg-[#eee] w-full cursor-pointer select-none py-[10px]"
            onClick={handleAllClick}
          >
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              <input className="m-0" type="checkbox" checked={allCheck} />
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Symbol
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Balance
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Convert&nbsp;Value&nbsp;($Tbull)
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Convert&nbsp;Value&nbsp;(Trx){' '}
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Fee&nbsp;($Tbull)
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Token&nbsp;List
            </th>
            <th className="px-[10px] text-[12px] font-normal md:text-[25px]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tableList.map((item: any, index: number) => (
            <tr
              key={index}
              onClick={() => handleClick(index, item.tokenId)}
              className={`hover:td:bg-[#bbb] w-full cursor-pointer select-none ${item.tokenId === MAIN_TOCKEN_ADDRESS ? 'text-[#ff0000]' : 'text-white'}`}
            >
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                <input className="m-0" type="checkbox" checked={item.checked} />
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.symbol}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.balance}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.convertValue0}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.convertValue1}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.fee}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.tokenList}
              </td>
              <td className="px-[10px] py-[10px] text-center text-[12px] md:text-[25px]">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Col>
  );
};

export default TRC20Table;
