import { useEffect, useState } from 'react';
// import {
//   DescriptionWrapper,
//   SubTitle,
//   CardinalWrapper,
//   DuesInputWrapper,
//   SaveAddButton,
//   FileWrapper,
//   ButtonWrapper,
//   InputWrapper,
//   ModalWrapper,
//   InputContainer,
//   StyledDuesInput,
//   StyledCloseButton,
// } from '@/styles/admin/DuesRegisterAdd.styled';
import * as S from '@/styles/admin/DuesRegisterAdd.styled';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import Close from '@/assets/images/ic_admin_close.svg';
import { FileObject } from '@/types/account';
import updateReceipt from '@/api/admin/dues/updateReceipt';
import useDuesFileUpload from '@/hooks/admin/handleFileChange';
import Button from '../Button';
import DuesModalButton from '../DuesModalButton';
import DuesInput from '../DuesInput';
import CardinalDropdown from '../Cardinal';

interface DuesModifyModalProps {
  onClose: () => void;
  record: {
    id?: number;
    date: string;
    title?: string;
    amount?: number;
    source?: string;
    cardinal: number | null;
    fileUrls?: FileObject[];
  };
  onSave: (updatedRecord: any) => void;
}

const DuesModifyModal: React.FC<DuesModifyModalProps> = ({
  onClose,
  record,
  onSave,
}) => {
  const [date, setDate] = useState(record.date);
  const [title, setTitle] = useState(record.title);
  const [amount, setAmount] = useState(record.amount);
  const [source, setSource] = useState(record.source);
  const [selectedCardinal, setSelectedCardinal] = useState(record.cardinal);
  const [customCardinal, setCustomCardinal] = useState('');
  const {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  } = useDuesFileUpload();

  useEffect(() => {
    if (selectedCardinal) setCustomCardinal(`${selectedCardinal}기`);

    if (record.fileUrls) {
      setUploadedFiles([...record.fileUrls]);
    }
  }, [selectedCardinal, record.fileUrls]);

  const handleSave = async () => {
    if (!record.id) {
      alert('수정할 항목의 ID가 없습니다.');
      return;
    }

    try {
      const updatedRecord = {
        id: record.id,
        date,
        title,
        amount: Number(amount),
        source,
        cardinal: selectedCardinal,
        fileUrls: [...uploadedFiles],
      };

      await updateReceipt(updatedRecord);
      onSave(updatedRecord);
      onClose();
    } catch (error) {
      console.error('회비 수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  const handleCustomCardinalBlur = () => {
    const cardinalNumber = Number(customCardinal.trim());
    if (!Number.isNaN(cardinalNumber) && cardinalNumber > 0) {
      setCustomCardinal(`${cardinalNumber}기`);
    }
  };

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      title="회비 지출 기록 수정"
      footer={
        <S.SaveAddButton>
          <DuesModalButton description="Cancel" onClick={onClose} />
          <DuesModalButton description="저장" onClick={handleSave} />
        </S.SaveAddButton>
      }
      height="800px"
      top="50%"
    >
      <S.ModalWrapper>
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
        <S.SubTitle>일자</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용 내용</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용 금액</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={amount !== undefined ? amount.toString() : ''}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용처</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </S.DescriptionWrapper>

        <S.SubTitle>영수증 첨부</S.SubTitle>
        <S.DescriptionWrapper>
          <S.FileWrapper>
            <S.ButtonWrapper>
              <input
                id="modal-file-upload"
                type="file"
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <Button
                description="파일 선택"
                color="#00dda8"
                width="99px"
                onClick={() => {
                  document.getElementById('modal-file-upload')?.click();
                }}
              />
            </S.ButtonWrapper>

            <S.InputWrapper>
              {uploadedFiles.length === 0 ? (
                <DuesInput
                  width="90%"
                  placeholder="선택된 파일 없음"
                  readOnly
                />
              ) : (
                uploadedFiles.map((file) => (
                  <S.InputContainer key={file.fileId}>
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
      </S.ModalWrapper>
    </CommonModal>
  );
};

export default DuesModifyModal;
