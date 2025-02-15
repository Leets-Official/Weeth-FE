import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const fetchAttendancesByCardinal = async (cardinal: number | undefined) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/admin/attendances/meetings`,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
        params: cardinal !== undefined ? { cardinal } : {},
      },
    );
    return res.data;
  } catch (error) {
    console.error('출석 데이터 가져오기 실패', error);
    return null;
  }
};

export default fetchAttendancesByCardinal;
