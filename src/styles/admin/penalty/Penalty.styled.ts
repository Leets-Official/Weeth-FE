import theme from '@/styles/theme';
import { styled } from 'styled-components';

// penaltyListTable.tsx
export const TableWrapper = styled.div`
  font-size: 18px;
  border-collapse: collapse;

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  margin: 0;
`;

export const TableContainer = styled.div`
  width: 63%;
  min-width: 830px;
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  padding-top: 10px;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
`;

export const Row = styled.tr<{ isSelected: boolean }>`
  border-bottom: 1px solid #dedede;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? '#e9e9e9' : 'transparent'};
`;

export const Cell = styled.td`
  padding: 15px 25px;
  text-align: left;
  white-space: nowrap;
`;

export const PlusButtonCell = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: 15px 25px;
  border-bottom: 1px solid #dedede;
  font-weight: bold;
  white-space: nowrap;
`;

export const SubHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 4.8fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'reason  penalty penaltyDate empty empty';
  border-bottom: 1px solid #dedede;
  gap: 10px;
  padding: 5px;
  padding-left: 130px;
  background-color: #e6fcf7;
  font-weight: bold;
`;

export const GridCell = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  padding: 5px;
  text-align: left;
  white-space: nowrap;
`;
export const ExpandedRow = styled.tr`
  td {
    grid-column: 1 / -1;
  }
`;

export const EmptyCell = styled.td`
  width: 150px;
`;

// penaltyAdd.tsx
export const AddContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 120px 120px;
  grid-template-areas: 'reason penalty penaltyDate empty actions';
  border-bottom: 1px solid #dedede;
  gap: 10px;
  padding-left: 70px;
  background-color: ${theme.color.gray[100]};
  align-items: center;
  box-sizing: border-box;
`;

export const Input = styled.input`
  font-family: ${theme.font.regular};
  padding: 8px;
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  text-overflow: ellipsis;
  border: none;
  font-size: 18px;
  outline: none;
`;

export const ButtonWrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
`;

// penaltyDetail.tsx
export const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 1fr 1fr 0.7fr 1fr;
  grid-template-areas: ' reason penalty penaltyDate empty actions';
  /* gap: 10px; */
  padding-left: 135px;
  border-bottom: 1px solid #dedede;
  background-color: #ffffff;
  align-items: center;
  box-sizing: border-box;
`;

export const DetailText = styled.div`
  font-size: 18px;
`;
