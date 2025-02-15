import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const fetchAttendances = async (meetingId: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/admin/attendances/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('출석 데이터 불러오기 실패: ', error);
    return null;
  }
};

export default fetchAttendances;
