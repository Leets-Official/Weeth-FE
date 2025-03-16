import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
`;

const StyledInput = styled.input`
  width: 350px;
  height: 45px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 16px;
  padding: 3px 0 3px 10px;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;

const EventInput = ({
  origValue,
  editValue,
  placeholder,
}: {
  origValue: string;
  editValue: (val: string) => void;
  placeholder?: string;
}) => {
  const [value, setValue] = useState(origValue);

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    editValue(newValue);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      value={value as string}
      onChange={handleChange}
    />
  );
};

export default EventInput;

export const EventInputBlock = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};
