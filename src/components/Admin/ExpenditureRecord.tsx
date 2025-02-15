import {
  Container,
  Wrapper,
  DateWrapper,
  Date,
  ButtonWrapper,
  ExpenditureWrapper,
  ExpenditureTitle,
  Master,
  ExpenditureMaster,
  ModifyButton,
} from '@/styles/admin/ExpenditureRecord.styled';
import { useState, useEffect } from 'react';
import fetchAccountData from '@/api/admin/dues/getAccount';
import { AccountResponse, RECEIPT, FileObject } from '@/types/account';
import Receipt from '@/assets/images/ic_admin_receipt.svg';
import deleteReceipt from '@/api/admin/dues/deleteReceipt';
import Button from './Button';
import DuesModifyModal from './Modal/DuesModifyModal';
import ReceiptModal from './Modal/ReceiptModal';

export interface ExpenditureRecordProps {
  date: string;
  title?: string;
  amount?: number;
  source?: string;
  cardinal: number | null;
  files?: FileObject[];
  id?: number;
  description?: string;
}

const ExpenditureRecord: React.FC<{ cardinal: number | null }> = ({
  cardinal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<ExpenditureRecordProps[]>([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState<FileObject[] | null>(
    null,
  );
  const [selectedRecord, setSelectedRecord] =
    useState<ExpenditureRecordProps | null>(null);

  const closeImageModal = () => setSelectedFileUrls(null);

  useEffect(() => {
    if (cardinal === null) return;

    const getData = async () => {
      try {
        const response: AccountResponse = await fetchAccountData(cardinal);
        if (response.code === 200) {
          const { receipts } = response.data;

          const formattedRecords: ExpenditureRecordProps[] = receipts.map(
            (receipt: RECEIPT) => ({
              date: receipt.date,
              title: receipt.description ?? '',
              amount: receipt.amount,
              source: receipt.source,
              files: receipt.fileUrls,
              cardinal,
              id: receipt.id,
            }),
          );
          setRecords(formattedRecords);
        }
      } catch (error) {
        console.error('지출 내역을 불러오는 중 오류 발생:', error);
      }
    };
    getData();
  }, [cardinal]);

  const openModal = (record: ExpenditureRecordProps) => {
    setSelectedRecord(record);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleSave = (updatedRecord: ExpenditureRecordProps) => {
    setRecords((prevRecords) =>
      prevRecords.map((rec) =>
        rec.id === updatedRecord.id ? { ...rec, ...updatedRecord } : rec,
      ),
    );
    setIsModalOpen(false);
  };

  const handleDelete = async (receiptId: number) => {
    try {
      await deleteReceipt(receiptId);
      setRecords((prevRecords) =>
        prevRecords.filter((rec) => rec.id !== receiptId),
      );
    } catch (error) {
      console.error('삭제 중 오류가 발생하였습니다', error);
    }
  };

  return (
    <Container>
      {records.map((item) => (
        <Wrapper key={item.id}>
          <DateWrapper>
            <Date>{item.date}</Date>
            <ButtonWrapper>
              <ModifyButton onClick={() => openModal(item)}>
                <Button description="수정" color="#323232" width="64px" />
              </ModifyButton>
              <ModifyButton
                onClick={() => item.id !== undefined && handleDelete(item.id)}
              >
                <Button description="삭제" color="#ff5858" width="64px" />
              </ModifyButton>
            </ButtonWrapper>
          </DateWrapper>
          <ExpenditureWrapper>
            <div>
              <ExpenditureTitle>{item.title}</ExpenditureTitle>
              <ExpenditureTitle>{item.amount}원</ExpenditureTitle>
            </div>
            <ExpenditureMaster>
              <Master>{item.source}</Master>
              <button
                type="button"
                onClick={() => {
                  setSelectedFileUrls(
                    item.files && item.files.length > 0 ? item.files : [],
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedFileUrls(item.files ?? null);
                  }
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={Receipt} alt="영수증 보기" />
              </button>
            </ExpenditureMaster>
          </ExpenditureWrapper>
        </Wrapper>
      ))}

      {selectedFileUrls && (
        <ReceiptModal files={selectedFileUrls} onClose={closeImageModal} />
      )}

      {isModalOpen && selectedRecord && (
        <DuesModifyModal
          onClose={closeModal}
          record={selectedRecord}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};

export default ExpenditureRecord;
