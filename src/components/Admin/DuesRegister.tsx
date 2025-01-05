import styled from 'styled-components';
import theme from '@/styles/theme';
import { useState } from 'react';
import DownButton from '@/assets/images/ic_admin_cardinal.svg';
import DuesRegisterDropDown from './DuesRegisterDropDown';

const Wrapper = styled.div`
  width: 90%;
  height: 72px;
  margin-top: 50px;
  background-color: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-family: ${theme.font.regular};
`;

const DuesRegister: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Wrapper>
        <Title onClick={toggleForm}>
          총 회비 최초 등록
          <img src={DownButton} alt="DownButton" />
        </Title>
      </Wrapper>
      {isOpen && <DuesRegisterDropDown />}
    </>
  );
};

export default DuesRegister;
