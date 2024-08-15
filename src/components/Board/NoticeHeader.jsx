import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import theme from '../../styles/theme';

const StyledHeader = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

const NoticeHeader = ({
  onMenuClick,
  showModal,
  ModalComponent,
  showIndexButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleIndexButtonClick = () => {
    if (ModalComponent) {
      setIsModalOpen(true);
    }
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
        {showIndexButton ? (
          <IndexButton onClick={handleIndexButtonClick} />
        ) : (
          <div />
        )}
      </StyledHeader>
      {isModalOpen && (
        <ModalComponent
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
  ModalComponent: PropTypes.elementType.isRequired, // 모달 컴포넌트 타입 prop
  showIndexButton: PropTypes.bool,
};

NoticeHeader.defaultProps = {
  showIndexButton: true,
};

export default NoticeHeader;
