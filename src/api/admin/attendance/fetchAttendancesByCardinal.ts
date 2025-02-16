import api from '@/api/api';

const fetchAttendancesByCardinal = async (cardinal: number | undefined) => {
  try {
    const res = await api.get(`/api/v1/admin/attendances/meetings`, {
      params: cardinal !== undefined ? { cardinal } : {},
    });
    return res.data;
  } catch (error) {
    console.error('출석 데이터 가져오기 실패', error);
    return null;
  }
};

export default fetchAttendancesByCardinal;
