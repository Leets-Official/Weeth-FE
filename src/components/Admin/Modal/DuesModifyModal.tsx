import { useState, useEffect } from 'react';
import {
  DescriptionWrapper,
  SubTitle,
  CardinalWrapper,
  DuesInputWrapper,
  SaveAddButton,
  FileWrapper,
} from '@/styles/admin/DuesRegisterAdd.styled';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import { FileObject } from '@/types/account';
import DuesFileUpload from '@/hooks/admin/handleFileChange';
import updateReceipt from '@/api/admin/dues/updateReceipt';
import styled from 'styled-components';
import DuesModalButton from '../DuesModalButton';
import DuesInput from '../DuesInput';
import CardinalDropdown from '../Cardinal';

const Wrapper = styled.div`
  width: 100%;
`;

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
  const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([]);

  useEffect(() => {
    if (selectedCardinal) setCustomCardinal(`${selectedCardinal}기`);

    if (record.fileUrls) {
      setUploadedFiles(record.fileUrls);
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
        fileUrls: uploadedFiles,
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
        <SaveAddButton>
          <DuesModalButton description="Cancel" onClick={onClose} />
          <DuesModalButton description="저장" onClick={handleSave} />
        </SaveAddButton>
      }
      height="800px"
      top="50%"
    >
      <Wrapper>
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
        <SubTitle>일자</SubTitle>
        <DescriptionWrapper>
          <DuesInput
            width="91%"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DescriptionWrapper>

        <SubTitle>사용 내용</SubTitle>
        <DescriptionWrapper>
          <DuesInput
            width="91%"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DescriptionWrapper>

        <SubTitle>사용 금액</SubTitle>
        <DescriptionWrapper>
          <DuesInput
            width="91%"
            value={amount !== undefined ? amount.toString() : ''}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </DescriptionWrapper>

        <SubTitle>사용처</SubTitle>
        <DescriptionWrapper>
          <DuesInput
            width="91%"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </DescriptionWrapper>

        <SubTitle>영수증 첨부</SubTitle>
        <FileWrapper>
          <DuesFileUpload
            onFilesUploaded={(newFiles) => setUploadedFiles([...newFiles])}
            existingFiles={record.fileUrls || []}
          />
        </FileWrapper>
      </Wrapper>
    </CommonModal>
  );
};

export default DuesModifyModal;
