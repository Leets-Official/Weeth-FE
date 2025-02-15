import axios from 'axios';
import { ExpenditureRecordProps } from '@/components/Admin/ExpenditureRecord';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const updateReceipt = async (updatedRecord: ExpenditureRecordProps) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/admin/receipts/${updatedRecord.id}`,
      {
        description: updatedRecord.title,
        source: updatedRecord.source,
        amount: updatedRecord.amount,
        date: updatedRecord.date,
        cardinal: updatedRecord.cardinal,
        files: updatedRecord.fileUrls || [],
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );

    if (response.status === 200) {
      alert('수정이 완료되었습니다!');
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
};

export default updateReceipt;
