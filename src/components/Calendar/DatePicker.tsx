import PropTypes from 'prop-types';
import styled from 'styled-components';

import icCalendar from '../../assets/images/ic_date.svg';
import icWave from '../../assets/images/ic_wave.svg';
import DateInput from './DateInput';

interface DatePickerProps {
  status: string;
  onDateChange: (index: number, value: number) => void;
  date: string[] | number[];
  onChange: () => void;
}

const StyledPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const WaveImg = styled.img`
  margin: 0px 6px;
`;

const DatePicker: React.FC<DatePickerProps> = ({ status, onDateChange, date }) => {
  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={date[0]}
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="year"
      />
      <DateInput
        value={date[1]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="month"
      />
      <DateInput
        value={date[2]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="day"
      />
      <DateInput
        value={date[3]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="hour"
      />
      <DateInput
        value={date[4]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="minute"
      />
    </StyledPicker>
  );
};

export default DatePicker;
