import api from '@/api/api';
import { ExpenditureRecordProps } from '@/components/Admin/ExpenditureRecord';

const updateReceipt = async (updatedRecord: ExpenditureRecordProps) => {
  try {
    const response = await api.patch(
      `/api/v1/admin/receipts/${updatedRecord.id}`,
      {
        description: updatedRecord.title,
        source: updatedRecord.source,
        amount: updatedRecord.amount,
        date: updatedRecord.date,
        cardinal: updatedRecord.cardinal,
        files: updatedRecord.files || [],
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
