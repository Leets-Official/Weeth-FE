import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import theme from '../../styles/theme';
import EditDelModal from '../EditDelModal';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

const NoticeHeader = ({ onMenuClick, showModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleIndexButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledHeader>
        <LeftButton />
        <TitleWrapper>
          <Title text="게시판" />
        </TitleWrapper>
        <IndexButton onClick={handleIndexButtonClick} />
      </StyledHeader>
      {isModalOpen && (
        <EditDelModal
          title="글"
          onClickEdit={() => onMenuClick('edit')}
          onClickDel={() => onMenuClick('delete')}
          onClickCancel={handleCloseModal}
        />
      )}
    </>
  );
};

NoticeHeader.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default NoticeHeader;
