/* eslint-disable no-alert */
import * as S from '@/styles/calendar/DateInput.styled';
import { useEffect, useState } from 'react';

interface DateInputProps {
  type?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  width: string;
  height: string;
  margin: string;
  year?: number;
  month?: number;
  inputType: string;
}

const getMaxDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  width,
  height,
  margin,
  year,
  month,
  inputType,
}) => {
  const [date, setDate] = useState(value);

  const checkValidDate = (val: number | undefined) => {
    if (val === undefined) return true; // Allow empty value for clearing input
    switch (inputType) {
      case 'year':
        return typeof val === 'string' && val >= 2020 && val <= 2040; // 최대 4자리
      case 'month':
        return val >= 1 && val <= 12; // 1~12 사이
      case 'day':
        if (year && month) {
          const maxDays = getMaxDaysInMonth(year, month);
          return val >= 1 && val <= maxDays;
        }
        return val >= 1 && val <= 31; // 기본 1~31 사이
      case 'hour':
        return val >= 0 && val <= 23; // 0~23 사이
      case 'minute':
        return val >= 0 && val <= 59; // 0~59 사이
      default:
        return true;
    }
  };

  useEffect(() => {
    // value가 변경될 때만 date 상태를 업데이트
    const numericValue = Number(value);
    if (checkValidDate(numericValue)) {
      setDate(numericValue);
    }
  }, [value]);

  const onChangeValue = (e: any) => {
    const val = e.target.value;
    setDate(val); // 우선 상태값을 설정
    // 유효성 검사는 onBlur에서만 처리
  };

  const onBlur = () => {
    const numericDate = Number(date);
    if (!checkValidDate(numericDate)) {
      let validDate = value; // 유효하지 않다면 원래 값을 복구
      switch (inputType) {
        case 'year':
          validDate = Math.min(Math.max(numericDate, 2020), 2040);
          break;
        case 'month':
          validDate = Math.min(Math.max(numericDate, 1), 12);
          break;
        case 'day':
          if (year && month) {
            const maxDays = getMaxDaysInMonth(year, month);
            validDate = Math.min(Math.max(numericDate, 1), maxDays);
          } else {
            validDate = Math.min(Math.max(numericDate, 1), 31);
          }
          break;
        case 'hour':
          validDate = Math.min(Math.max(numericDate, 0), 23);
          break;
        case 'minute':
          validDate = Math.min(Math.max(numericDate, 0), 59);
          break;
        default:
          break;
      }
      setDate(validDate);
      onChange(validDate ?? 0);
    } else {
      onChange(numericDate); // 유효하다면 그대로 부모 컴포넌트에 전달
    }
  };

  return (
    <div>
      <S.StyledInput
        type="number"
        value={date}
        onChange={onChangeValue}
        onBlur={onBlur}
        $width={width}
        $height={height}
        $margin={margin}
        min={inputType === 'year' ? '1000' : undefined}
        max={inputType === 'year' ? '9999' : undefined}
      />
    </div>
  );
};

export default DateInput;
