/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LeftButton from '../Header/LeftButton';
import MenuButton from '../Header/MenuButton';
import Title from '../Header/Title';

const StyledHeader = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NoticeHeader = ({
  onMenuClick,
  showModal,
  ModalComponent,
  showMenuButton,
  isWriter, // 추가: 글 작성자인지 여부를 받는 prop
  isAdmin, // 추가: 관리자인지 여부를 받는 prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleMenuButtonClick = () => {
    if (ModalComponent) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 상세 페이지에서 MenuButton을 렌더링할지 여부를 결정
  const shouldShowMenuButton = showMenuButton && (isWriter || isAdmin);

  return (
    <>
      <StyledHeader>
        <LeftButton />
        <TitleWrapper>
          <Title text="게시판" />
        </TitleWrapper>
        {shouldShowMenuButton ? (
          <MenuButton onClick={handleMenuButtonClick} />
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
  onMenuClick: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
  ModalComponent: PropTypes.elementType.isRequired, // 모달 컴포넌트 타입 prop
  showMenuButton: PropTypes.bool,
  isWriter: PropTypes.bool, // 글 작성자인지 여부
  isAdmin: PropTypes.bool, // 관리자인지 여부
};

NoticeHeader.defaultProps = {
  showMenuButton: true,
  isWriter: false, // 기본값 추가
  isAdmin: false, // 기본값 추가
};

export default NoticeHeader;
