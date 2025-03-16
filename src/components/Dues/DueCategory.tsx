import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

interface DueCategoryProps {
  setSelectedDues: (dues: string | null) => void;
}

const StyledCategory = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button<{ checked: boolean }>`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 30%;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.checked ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  text-align: center;
`;

const DueCategory: React.FC<DueCategoryProps> = ({ setSelectedDues }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const onClickAll = () => {
    setSelectedCategory('all');
    setSelectedDues(null);
  };

  const onClick1 = () => {
    setSelectedCategory('회비');
    setSelectedDues('회비');
  };

  const onClick2 = () => {
    setSelectedCategory('지출');
    setSelectedDues('지출');
  };

  return (
    <StyledCategory>
      <Button
        type="button"
        checked={selectedCategory === 'all'}
        onClick={onClickAll}
      >
        전체
      </Button>
      <Button
        type="button"
        checked={selectedCategory === '회비'}
        onClick={onClick1}
      >
        회비
      </Button>
      <Button
        type="button"
        checked={selectedCategory === '지출'}
        onClick={onClick2}
      >
        지출
      </Button>
    </StyledCategory>
  );
};

export default DueCategory;
