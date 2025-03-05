import { useEffect, useState } from 'react';
import * as S from '@/styles/admin/DuesRegisterAdd.styled';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import Close from '@/assets/images/ic_admin_close.svg';
import { FileObject } from '@/types/account';
import updateReceipt from '@/api/admin/dues/updateReceipt';
import useDuesFileUpload from '@/hooks/admin/handleFileChange';
import Button from '@/components/Admin/Button';
import DuesInput from '@/components/Admin/DuesInput';
import DuesModalButton from '@/components/Admin/DuesModalButton';

interface DuesModifyModalProps {
  onClose: () => void;
  record: {
    id?: number;
    date: string;
    title?: string;
    amount?: number;
    source?: string;
    cardinal: number | null;
    files?: FileObject[];
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
  const {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  } = useDuesFileUpload();

  const handleDateChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');

    let formattedDate = '';
    if (onlyNumbers.length <= 4) {
      formattedDate = onlyNumbers;
    } else if (onlyNumbers.length <= 6) {
      formattedDate = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}`;
    } else {
      formattedDate = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}-${onlyNumbers.slice(6, 8)}`;
    }

    setDate(formattedDate);
  };

  useEffect(() => {
    if (record.files) {
      setUploadedFiles([...record.files]);
    }
  }, [record.files]);

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
        cardinal: record.cardinal,
        files: [...uploadedFiles],
      };

      await updateReceipt(updatedRecord);
      onSave(updatedRecord);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('회비 수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
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
          <S.DuesInputWrapper>
            <DuesInput
              width="95%"
              placeholder={record.cardinal ? `${record.cardinal}기` : ''}
              value=""
              readOnly
            />
          </S.DuesInputWrapper>
        </S.CardinalWrapper>
        <S.SubTitle>일자</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
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
