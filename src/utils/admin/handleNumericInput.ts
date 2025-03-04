// 숫자 이외의 문자 제거
const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<any>>,
  maxLength?: number, // 입력 가능한 최대 길이
  allowedValues?: string[], // 허용할 값 리스트 ( 학기: ['1', '2'])
) => {
  const { name, value } = e.target;

  let numericValue = value.replace(/[^0-9]/g, '');

  if (maxLength) {
    numericValue = numericValue.slice(0, maxLength);
  }

  if (allowedValues && !allowedValues.includes(numericValue)) {
    numericValue = '';
  }

  setState((prev: any) => ({
    ...prev,
    [name]: numericValue,
  }));
};

const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // 숫자 키, 백스페이스, 삭제키만 허용
  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
    e.preventDefault();
  }
};

export { preventNonNumeric, handleNumericInput };
