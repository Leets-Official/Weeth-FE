import icCalendar from '@/assets/images/ic_date.svg';
import icWave from '@/assets/images/ic_wave.svg';
import DateInput from '@/components/Calendar/DateInput';
import * as S from '@/styles/calendar/DatePicker.styled';

const DatePicker = ({
  status,
  onDateChange,
  date,
}: {
  status: string;
  onDateChange: (index: number, value: number) => void;
  date: string[] | number[];
}) => {
  const dateFields = [
    { label: '년', width: '58px', inputType: 'year' },
    { label: '월', width: '37px', inputType: 'month' },
    { label: '일', width: '37px', inputType: 'day' },
    { label: '시', width: '37px', inputType: 'hour' },
    { label: '분', width: '37px', inputType: 'minute' },
  ];

  return (
    <S.PickerWrapper>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <S.Icon src={icWave} alt="물결" />
      )}
      {dateFields.map((field, index) => (
        <>
          <DateInput
            value={date[index]}
            width={field.width}
            height="28px"
            margin="5px"
            onChange={(value) =>
              onDateChange(
                index,
                typeof value === 'string' ? parseInt(value, 10) : value,
              )
            }
            inputType={field.inputType}
          />
          {field.label === '시' ? ' : ' : field.label !== '분' && field.label}
        </>
      ))}
    </S.PickerWrapper>
  );
};

export default DatePicker;
