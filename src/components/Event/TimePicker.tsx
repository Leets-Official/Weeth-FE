import { useEffect, useRef } from 'react';
import { TimepickerUI } from 'timepicker-ui';
import styled from 'styled-components';

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  width: 75px;
  font-size: 16px;
`;

const TimePicker = ({
  onChange,
  inputValue,
  setInputValue,
}: {
  onChange?: (time: string) => void;
  inputValue: string;
  setInputValue: (time: string) => void;
}) => {
  const timepickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!timepickerRef.current) return;

    const timepicker = new TimepickerUI(timepickerRef.current, {});
    timepicker.create();

    const handleAccept = (event: Event) => {
      const customEvent = event as CustomEvent<{
        hour: string;
        minutes: string;
        type: string;
      }>;
      if (customEvent.detail) {
        const { hour, minutes, type } = customEvent.detail;
        const newTime = `${hour}:${minutes} ${type}`;
        setInputValue(newTime);
        onChange?.(newTime);
      }
    };

    timepickerRef.current.addEventListener(
      'accept',
      handleAccept as EventListener,
    );

    // eslint-disable-next-line consistent-return
    return () => {
      timepickerRef.current?.removeEventListener(
        'accept',
        handleAccept as EventListener,
      );
    };
  }, []);

  return (
    <div className="timepicker-ui" ref={timepickerRef}>
      <Input
        type="text"
        className="timepicker-ui-input"
        value={inputValue}
        readOnly
      />
    </div>
  );
};

export default TimePicker;
