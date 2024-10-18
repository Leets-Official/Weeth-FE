import icCalendar from '@/assets/images/ic_date.svg';
import icWave from '@/assets/images/ic_wave.svg';
import DateInput from '@/components/Calendar/DateInput';
import * as S from '@/styles/calendar/DatePicker.styled';

interface DatePickerProps {
  status: string;
  onDateChange: (index: number, value: number) => void;
  date: string[] | number[];
  onChange?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ status, onDateChange, date }) => {
  return (
    <S.StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <S.WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={date[0]}
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="year"
      />년
      <DateInput
        value={date[1]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="month"
      />월
      <DateInput
        value={date[2]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="day"
      />일
      <DateInput
        value={date[3]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="hour"
      />:
      <DateInput
        value={date[4]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, typeof value === 'string' ? parseInt(value, 10) : value)}
        inputType="minute"
      />
    </S.StyledPicker>
  );
};

export default DatePicker;
