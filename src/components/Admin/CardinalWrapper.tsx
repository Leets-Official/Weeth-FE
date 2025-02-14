import styled from 'styled-components';
import CardinalDropdown from './Cardinal';

interface TotalCardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: React.Dispatch<React.SetStateAction<number | null>>;
}

const CardinalWrapper = styled.div`
  width: 166px;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const TotalCardinal: React.FC<TotalCardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  return (
    <CardinalWrapper>
      <div>
        <CardinalDropdown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </div>
    </CardinalWrapper>
  );
};

export default TotalCardinal;
