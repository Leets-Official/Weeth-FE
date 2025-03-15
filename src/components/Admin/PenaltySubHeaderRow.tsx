import { styled } from 'styled-components';

export const SubHeaderRow = styled.td`
  display: grid;
  grid-template-columns:
    minmax(390px, auto) minmax(40px, 0.7fr) minmax(70px, 1fr)
    minmax(60px, auto);
  grid-template-areas: 'reason penalty penaltyDate empty';
  border-bottom: 1px solid #dedede;
  padding: 5px;
  padding-left: 149px;
  background-color: #e6fcf7;
  font-weight: bold;
  align-items: center;
`;

export const GridCell = styled.th<{ area: string }>`
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
