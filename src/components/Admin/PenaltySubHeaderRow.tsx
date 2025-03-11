import { styled } from 'styled-components';

export const SubHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1.5fr 1.3fr;
  grid-template-areas: 'reason penalty penaltyDate empty';
  border-bottom: 1px solid #dedede;
  padding: 5px;
  padding-left: 120px;
  background-color: #e6fcf7;
  font-weight: bold;
  align-items: center;
`;

export const GridCell = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  padding: 5px;
  text-align: left;
  white-space: nowrap;
`;

const PenaltySubHeaderRow: React.FC = () => {
  return (
    <tr>
      <td colSpan={8} style={{ padding: 0, margin: 0 }}>
        <SubHeaderRow>
          <GridCell area="reason">사유</GridCell>
          <GridCell area="penalty">패널티</GridCell>
          <GridCell area="penaltyDate">패널티 일자</GridCell>
        </SubHeaderRow>
      </td>
    </tr>
  );
};

export default PenaltySubHeaderRow;
