import styled from 'styled-components';
import theme from '@/styles/theme';

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div<{ top?: number; right?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  // position: absolute;
  // top: ${({ top }) => (top ? `${top}px` : 0)};
  // right: ${({ right }) => (right ? `${right}px` : 0)};
  width: 144px;
  box-sizing: border-box;

  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  font-size: 14px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const MenuModal = ({
  children,
  onClose,
  top,
  right,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  top?: number;
  right?: number;
}) => {
  return (
    <Container onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()} top={top} right={right}>
        {children}
      </Content>
    </Container>
  );
};

export default MenuModal;
