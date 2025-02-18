import api from '@/api/api';

const updateAttendanceStatus = async (
  updates: { attendanceId: number; status: string }[],
) => {
  try {
    const res = await api.patch(`/api/v1/admin/attendances/status`, updates);
    return res.data;
  } catch (error) {
    console.error('출석 상태 업데이트 실패: ', error);
    return null;
  }
};

export default updateAttendanceStatus;
