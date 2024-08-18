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
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

const NoticeHeader = ({
  onMenuClick,
  showModal,
  ModalComponent,
  showIndexButton,
  isWriter, // 추가: 글 작성자인지 여부를 받는 prop
  isAdmin, // 추가: 관리자인지 여부를 받는 prop
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

  // 상세 페이지에서 IndexButton을 렌더링할지 여부를 결정
  const shouldShowIndexButton = showIndexButton && (isWriter || isAdmin);

  return (
    <>
      <StyledHeader>
        <LeftButton />
        <TitleWrapper>
          <Title text="게시판" />
        </TitleWrapper>
        {shouldShowIndexButton ? (
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
  isWriter: PropTypes.bool, // 글 작성자인지 여부
  isAdmin: PropTypes.bool, // 관리자인지 여부
};

NoticeHeader.defaultProps = {
  showIndexButton: true,
  isWriter: false, // 기본값 추가
  isAdmin: false, // 기본값 추가
};

export default NoticeHeader;
