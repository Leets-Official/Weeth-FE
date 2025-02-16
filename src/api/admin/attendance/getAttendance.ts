import api from '@/api/api';

const fetchAttendances = async (meetingId: number) => {
  try {
    const res = await api.get(`/api/v1/admin/attendances/${meetingId}`);
    return res.data;
  } catch (error) {
    console.error('출석 데이터 불러오기 실패: ', error);
    return null;
  }
};

export default fetchAttendances;
