import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import theme from '../../styles/theme';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

const NoticeHeader = ({
  onMenuClick,
  showModal,
  isAdmin,
  ModalComponent,
  showIndexButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleIndexButtonClick = () => {
    if (isAdmin) {
      setIsModalOpen(true);
    } else if (ModalComponent) {
      setIsModalOpen(true);
    } else {
      alert('운영진만 접근할 수 있습니다.');
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
  isAdmin: PropTypes.bool, // 운영진 여부를 판단하는 prop
  ModalComponent: PropTypes.elementType.isRequired, // 모달 컴포넌트 타입 prop
  showIndexButton: PropTypes.bool,
};

NoticeHeader.defaultProps = {
  isAdmin: false, // 기본값은 일반 사용자
  showIndexButton: true,
};

export default NoticeHeader;
