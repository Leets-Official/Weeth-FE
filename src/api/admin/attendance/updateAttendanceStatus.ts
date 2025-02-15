import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const updateAttendanceStatus = async (
  updates: { attendanceId: number; status: string }[],
) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/v1/admin/attendances/status`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('출석 상태 업데이트 실패: ', error);
    return null;
  }
};

export default updateAttendanceStatus;
