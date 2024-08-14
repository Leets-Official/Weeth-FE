import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';
import Utils from '../../hooks/Utils';

const NoticeList = ({ noticeId }) => {
  const navigate = useNavigate();
  const [notices, setStudies] = useState([]);
  const { setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // API 호출 함수
  const fetchNotices = async (count = 2) => {
    try {
      const params = { count: count || 2 };
      if (noticeId) {
        params.noticeId = noticeId;
      }

      console.log('Request Params:', params);

      const response = await axios.get(`${BASE_URL}/api/v1/notices`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      console.log('API Response:', response); // 응답 전체를 로그로 출력

      if (response.status === 200 && response.data.code === 200) {
        const studiesData = response.data.data;
        if (studiesData.length === 0) {
          console.log('No more studies to load.');
          return;
        }

        const newNotices = studiesData.map((notice) => ({
          id: notice.id,
          name: notice.name,
          title: notice.title,
          content: notice.content,
          time: notice.time,
          commentCount: notice.commentCount,
        }));

        setStudies((prevNotices) => [...prevNotices, ...newNotices]);
      } else {
        console.error('API Error:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Request Error:', error); // 요청 에러 로그 출력

      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 400
      ) {
        console.error('Error: Non-existent notice ID.');
        setError('존재하지 않는 게시물입니다.');
      } else {
        // Utils를 사용하여 토큰 갱신 및 API 재시도
        try {
          const retryResponse = await Utils(
            error.response,
            fetchNotices,
            [noticeId, count],
            navigate,
          );
          if (retryResponse) {
            setStudies((prevNotices) => [
              ...prevNotices,
              ...retryResponse.data.data,
            ]);
          }
        } catch (retryError) {
          setError('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
        }
      }
    }
  };

  // 컴포넌트 마운트 시 서버로부터 최신 데이터를 로드
  useEffect(() => {
    fetchNotices(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken]);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreStudies = () => {
    if (notices.length > 0) {
      const lastNotice = notices[notices.length - 1];
      if (lastNotice && lastNotice.id) {
        console.log(
          'loadMoreStudies: Fetching with noticeId:',
          lastNotice.id,
          'and count: 5',
        );
        fetchNotices(lastNotice.id, 5);
      }
    } else {
      console.log('loadMoreNotices: Fetching initial notices with count: 5');
      fetchNotices(null, 5);
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigate = (notice) => {
    navigate(`/board/notices/${notice.id}`, {
      state: { type: 'notice', data: notice },
    });
  };

  return (
    <div>
      {notices.map((notice) => (
        <BoardComponent
          key={notice.id}
          name={notice.name}
          title={notice.title}
          content={notice.content}
          time={notice.time}
          totalComments={parseInt(notice.commentCount, 10) || 0}
          onClick={() => handleNavigate(notice)}
        />
      ))}
      <button type="button" onClick={loadMoreStudies}>
        더 불러오기
      </button>
    </div>
  );
};

NoticeList.propTypes = {
  noticeId: PropTypes.number,
};

NoticeList.defaultProps = {
  noticeId: null, // 기본 값을 null로 설정하여 선택적 prop으로 만듭니다.
};

export default NoticeList;
