import React from 'react';
import Col from '../public/Col';

interface FunctionProps {
  title?: string;
  subTitle?: string;
}
const FunctionComponent = ({ title, subTitle }: FunctionProps) => {
  return (
    <Col className="gap-[5px] md:gap-[15px]">
      <div className="font-lato text-[24px] font-bold uppercase">{title}</div>
      <div className="font-lato text-[18px] font-bold">{subTitle}</div>
    </Col>
  );
};

export default FunctionComponent;
