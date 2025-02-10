import styled from 'styled-components';
import theme from '@/styles/theme';
import Receipt from '@/assets/images/ic_admin_receipt.svg';
import { useState, useEffect } from 'react';
import fetchAccountData from '@/api/admin/dues/account';
import { AccountResponse, RECEIPT } from '@/types/account';
import Button from './Button';
import DuesModifyModal from './Modal/DuesModifyModal';

interface ExpenditureRecordProps {
  date?: string;
  title?: string;
  money?: number;
  master?: string;
  cardinal: number | null;
}

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #dedede;
`;

const DateWrapper = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  font-family: ${theme.font.regular};
  font-size: 18px;
  align-items: center;
`;

const Date = styled.div`
  margin-left: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ExpenditureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const ExpenditureTitle = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  margin-bottom: 20px;
`;

const Master = styled.div`
  margin-top: 20px;
`;
const ExpenditureMaster = styled.div`
  font-family: ${theme.font.regular};
  font-size: 18px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div``;

const ExpenditureRecord: React.FC<{ cardinal: number | null }> = ({
  cardinal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<ExpenditureRecordProps[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (cardinal === null) return;

    const getData = async () => {
      try {
        const response: AccountResponse = await fetchAccountData(cardinal);
        if (response.code === 200) {
          const { description, receipts } = response.data;

          const formattedRecords: ExpenditureRecordProps[] = receipts.map(
            (receipt: RECEIPT) => ({
              date: receipt.date,
              title: description,
              money: receipt.amount,
              master: receipt.description,
              cardinal,
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

  return (
    <Container>
      {records.map((item) => (
        <Wrapper>
          <DateWrapper>
            <Date>{item.date}</Date>
            <ButtonWrapper>
              <ModifyButton onClick={openModal}>
                <Button description="수정" color="#323232" width="64px" />
              </ModifyButton>

              <Button description="삭제" color="#ff5858" width="64px" />
            </ButtonWrapper>
          </DateWrapper>
          <ExpenditureWrapper>
            <div>
              <ExpenditureTitle>{item.title}</ExpenditureTitle>
              <ExpenditureTitle>{item.money}원</ExpenditureTitle>
            </div>
            <ExpenditureMaster>
              <Master>{item.master}</Master>
              <img src={Receipt} alt="Receipt" />
            </ExpenditureMaster>
          </ExpenditureWrapper>
        </Wrapper>
      ))}
      {isModalOpen && <DuesModifyModal onClose={closeModal} />}
    </Container>
  );
};

export default ExpenditureRecord;
