import styled from 'styled-components';
import Button from '@/components/Button/Button';

interface ButtonItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
  style?: React.CSSProperties;
}

interface ButtonGroupProps {
  buttons: ButtonItem[];
}

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  overflow-x: visible;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 3px;
  }

  @media (max-width: 900px) {
    gap: 9px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  white-space: nowrap;

  @media (max-width: 1300px) {
    font-size: 14px;
    width: fit-content;
  }

  @media (max-width: 1000px) {
    font-size: 12px;
    padding: 1px;
    width: fit-content;
  }
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <ButtonGroupContainer>
      {buttons.map(({ label, onClick, disabled, style }) => (
        <Button
          key={label}
          color={style?.backgroundColor || '#fff'}
          textcolor={style?.color || '#000'}
          width="auto"
          height="45px"
          borderRadius="4px"
          onClick={onClick}
          disabled={disabled}
        >
          <ButtonContent>{label}</ButtonContent>
        </Button>
      ))}
    </ButtonGroupContainer>
  );
};

export default ButtonGroup;
