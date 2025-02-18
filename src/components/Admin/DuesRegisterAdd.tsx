import { useState } from 'react';
import * as S from '@/styles/admin/DuesRegisterAdd.styled';
import adminReceipts from '@/api/admin/dues/adminReceipts';
import inputFields from '@/constants/admin/duesRegisterAddConstants';
import Close from '@/assets/images/ic_admin_close.svg';
import useDuesFileUpload from '@/hooks/admin/handleFileChange';
import CardinalDropdown from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';
import { ExpenditureRecordProps } from './ExpenditureRecord';

const DuesRegisterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [customCardinal, setCustomCardinal] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  } = useDuesFileUpload();

  const handleCustomCardinalBlur = () => {
    const cardinalNumber = Number(customCardinal.trim());
    if (!Number.isNaN(cardinalNumber) && cardinalNumber > 0) {
      setCustomCardinal(`${cardinalNumber}기`);
    }
  };

  const handleRegister = async () => {
    const cardinal =
      selectedCardinal ?? Number(customCardinal.replace('기', ''));
    const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;

    const requestData: ExpenditureRecordProps = {
      description,
      source,
      amount: Number(amount),
      date: formattedDate,
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
      setCustomCardinal('');
      setSelectedCardinal(null);
      setUploadedFiles([]);
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
    <S.Wrapper>
      <S.Title>회비 사용 내역 추가</S.Title>
      <S.SubTitle>기수</S.SubTitle>
      <S.CardinalWrapper>
        <div>
          <CardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={(value) => {
              setSelectedCardinal(value);
              setCustomCardinal(`${value}기`);
            }}
          />
        </div>
        <S.DuesInputWrapper>
          <DuesInput
            width="95%"
            placeholder="직접 입력"
            value={customCardinal}
            onChange={(e) => setCustomCardinal(e.target.value)}
            onBlur={handleCustomCardinalBlur}
          />
        </S.DuesInputWrapper>
      </S.CardinalWrapper>

      {inputFields.map((field) => (
        <div key={field.id}>
          <S.SubTitle>{field.title}</S.SubTitle>
          <S.DescriptionWrapper>
            <DuesInput
              width={field.width}
              placeholder={field.placeholder}
              value={getInputValue(field.id)}
              onChange={(e) => setInputValue(field.id, e.target.value)}
            />
          </S.DescriptionWrapper>
        </div>
      ))}

      <S.SubTitle>영수증 첨부</S.SubTitle>
      <S.DescriptionWrapper>
        <S.FileWrapper>
          <S.ButtonWrapper>
            <input
              id="file-upload"
              type="file"
              accept="image/*,application/pdf"
              style={{ display: 'none' }}
              multiple
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            <S.DuesWrapper>
              <Button
                description="파일 선택"
                color="#00dda8"
                width="99px"
                onClick={() => document.getElementById('file-upload')?.click()}
              />
            </S.DuesWrapper>
          </S.ButtonWrapper>

          <S.InputWrapper>
            {uploadedFiles.length === 0 ? (
              <DuesInput width="90%" placeholder="선택된 파일 없음" readOnly />
            ) : (
              uploadedFiles.map((file) => (
                <S.InputContainer key={file.fileId || file.fileName}>
                  <S.StyledDuesInput
                    width="90%"
                    placeholder={file.fileName}
                    readOnly
                  />
                  <S.StyledCloseButton
                    onClick={() => handleRemoveFile(file.fileName)}
                  >
                    <img src={Close} alt="삭제" width="20px" />
                  </S.StyledCloseButton>
                </S.InputContainer>
              ))
            )}
          </S.InputWrapper>
        </S.FileWrapper>
      </S.DescriptionWrapper>

      <S.SaveButton>
        <Button description="Cancel" color="#323232" width="89px" />
        <Button
          description="추가"
          color="#323232"
          width="64px"
          onClick={handleRegister}
        />
      </S.SaveButton>
    </S.Wrapper>
  );
};

export default DuesRegisterAdd;
