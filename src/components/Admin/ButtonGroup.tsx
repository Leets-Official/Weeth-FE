import styled from 'styled-components';
import Button from '@/components/Button/Button';

interface ButtonItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
}

interface ButtonGroupProps {
  buttons: ButtonItem[];
}

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-right: 20px;
`;

const ButtonContent = styled.div<{ hasIcon?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ hasIcon }) => (hasIcon ? '5px 10px' : '5px')};
  gap: ${({ hasIcon }) => (hasIcon ? '25px' : '0')};
`;

const SvgIcon = styled.img<{ width?: string; height?: string }>`
  cursor: pointer;
  width: ${({ width }) => width || '15px'};
  height: ${({ height }) => height || '15px'};
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <ButtonGroupContainer>
      {buttons.map(({ label, onClick, disabled, icon }) => (
        <Button
          key={label}
          color="#fff"
          textcolor="#000"
          width="auto"
          height="43px"
          borderRadius="4px"
          onClick={onClick}
          disabled={disabled}
        >
          <ButtonContent hasIcon={!!icon}>
            {label}
            {icon && <SvgIcon src={icon} alt={`${label}-icon`} />}
          </ButtonContent>
        </Button>
      ))}
    </ButtonGroupContainer>
  );
};

export default ButtonGroup;
