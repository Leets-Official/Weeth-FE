import { useState } from 'react';
import {
  Wrapper,
  Title,
  SubTitle,
  CardinalWrapper,
  DuesInputWrapper,
  SaveButton,
  DescriptionWrapper,
} from '@/styles/admin/DuesRegisterAdd.styled';
import adminReceipts from '@/api/admin/dues/adminReceipts';
import { FileObject } from '@/types/account';
import DuesFileUpload from '@/hooks/admin/handleFileChange';
import inputFields from '@/constants/admin/duesRegisterAddConstants';
import styled from 'styled-components';
import CardinalDropdown from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const ReceiptInputWrapper = styled.div`
  width: 100%;
`;

const DuesRegisterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [customCardinal, setCustomCardinal] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([]);

  const handleCustomCardinalBlur = () => {
    const cardinalNumber = Number(customCardinal.trim());
    if (!Number.isNaN(cardinalNumber) && cardinalNumber > 0) {
      setCustomCardinal(`${cardinalNumber}기`);
    }
  };

  const handleRegister = async () => {
    const cardinal =
      selectedCardinal ?? Number(customCardinal.replace('기', ''));

    const requestData = {
      description,
      source,
      amount: Number(amount),
      date,
      cardinal,
      files: uploadedFiles,
    };

    try {
      const res = await adminReceipts(requestData);
      if (res.code === 200) {
        alert('회비 사용 내역이 등록되었습니다.');
      }

      setDescription('');
      setSource('');
      setAmount('');
      setDate('');
      setUploadedFiles([]);
      setCustomCardinal('');
      setSelectedCardinal(null);
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  const getInputValue = (id: string) => {
    if (id === 'date') return date;
    if (id === 'content') return description;
    if (id === 'amount') return amount;
    return source;
  };

  const setInputValue = (id: string, value: string) => {
    if (id === 'date') setDate(value);
    else if (id === 'content') setDescription(value);
    else if (id === 'amount') setAmount(value);
    else setSource(value);
  };

  return (
    <Wrapper>
      <Title>회비 사용 내역 추가</Title>
      <SubTitle>기수</SubTitle>
      <CardinalWrapper>
        <div>
          <CardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={(value) => {
              setSelectedCardinal(value);
              setCustomCardinal(`${value}기`);
            }}
          />
        </div>
        <DuesInputWrapper>
          <DuesInput
            width="95%"
            placeholder="직접 입력"
            value={customCardinal}
            onChange={(e) => setCustomCardinal(e.target.value)}
            onBlur={handleCustomCardinalBlur}
          />
        </DuesInputWrapper>
      </CardinalWrapper>

      {inputFields.map((field) => (
        <div key={field.id}>
          <SubTitle>{field.title}</SubTitle>
          <DescriptionWrapper>
            <DuesInput
              width={field.width}
              placeholder={field.placeholder}
              value={getInputValue(field.id)}
              onChange={(e) => setInputValue(field.id, e.target.value)}
            />
          </DescriptionWrapper>
        </div>
      ))}

      <SubTitle>영수증 첨부</SubTitle>
      <ReceiptInputWrapper>
        <DuesFileUpload onFilesUploaded={setUploadedFiles} />
      </ReceiptInputWrapper>

      <SaveButton>
        <Button description="Cancel" color="#323232" width="89px" />
        <Button
          description="추가"
          color="#323232"
          width="64px"
          onClick={handleRegister}
        />
      </SaveButton>
    </Wrapper>
  );
};

export default DuesRegisterAdd;
