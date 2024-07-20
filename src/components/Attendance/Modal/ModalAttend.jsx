import React from 'react';
import PropTypes from 'prop-types';
import './ModalAttend.css';
import styled from 'styled-components';

const Line = styled.div`
  border: 1px solid;
  margin: 10px;
  transform: scaleY(0.2);
`;

const ModalAttend = ({ open, close }) => {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>출석하기</h2>
            <button className="modal-close" onClick={close} type="button">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>
              오늘은 <strong>“프로젝트 중간 발표”</strong>가 있는 날이에요
            </p>
            <p>날짜: 2024년 7월 18일 (19:00 - 20:30)</p>
            <p>장소: 가천관 247호</p>
            <Line />
            <input className="modal-input" type="text" placeholder="I" />
          </div>
          <div className="modal-buttons">
            <button onClick={close} type="button">
              입력완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ModalAttend.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalAttend;
