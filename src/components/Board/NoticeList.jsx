import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import more from '../../assets/images/ic_moreButton.svg';
import Utils from '../../hooks/Utils';

const NoticeList = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 공지가 있는지 여부를 확인하는 상태 변수

  const accessToken = localStorage.getItem('accessToken');
  // const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // API 호출 함수
  const fetchNotices = async (noticeId = null, count = 15) => {
    try {
      const params = { count: count || 5 };
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
        const noticesData = response.data.data;
        console.log('Number of notices received:', noticesData.length);

        if (noticesData.length === 0) {
          console.log('No more notices to load.');
          setHasMore(false); // 더 이상 로드할 공지가 없으므로 'hasMore'를 false로 설정
        } else {
          const newNotices = noticesData.map((notice) => ({
            id: notice.id,
            name: notice.name,
            title: notice.title,
            content: notice.content,
            time: notice.time,
            commentCount: notice.commentCount,
          }));

          setNotices((prevNotices) => [...prevNotices, ...newNotices]);
          setHasMore(!response.data.isLastPage);
        }
      } else {
        console.error('API Error:', response.data.message);
        setHasMore(false); // 에러가 발생했으므로 더 이상 로드할 공지가 없다고 처리
      }
    } catch (error) {
      console.error('Request Error:', error); // 요청 에러 로그 출력

      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 400
      ) {
        console.error('Error: Non-existent notice ID.');
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
            const noticesData = retryResponse.data.data;
            if (noticesData.length === 0) {
              console.log('No more notices to load after retry.');
              setHasMore(false); // 재시도 후에도 더 이상 로드할 공지가 없으므로 'hasMore'를 false로 설정
            } else {
              setNotices((prevNotices) => [...prevNotices, ...noticesData]);
              setHasMore(!retryResponse.data.isLastPage);
            }
          }
        } catch (retryError) {
          console.log('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
          setHasMore(false); // 재시도 중에도 오류가 발생했으므로 더 이상 로드할 공지가 없다고 처리
        }
      }
    }
  };

  // 컴포넌트 마운트 시 서버로부터 최신 데이터를 로드
  useEffect(() => {
    fetchNotices(null, 15); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken]);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreNotices = () => {
    if (notices.length > 0) {
      const lastNotice = notices[notices.length - 1];
      if (lastNotice && lastNotice.id) {
        console.log(
          'loadMoreNotices: Fetching with postId:',
          lastNotice.id,
          'and count: 15',
        );
        fetchNotices(lastNotice.id, 15);
      }
    } else {
      console.log('loadMoreNotices: Fetching initial studies with count: 15');
      fetchNotices(null, 15);
    }
  };
  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigate = (notice) => {
    navigate(`/board/notices/${notice.id}`, {
      state: { type: 'notice', data: notice },
    });
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    width: '62px',
    height: '20px',
  };

  const imgStyle = {
    width: '62px',
    height: '20px',
  };

  return (
    <div>
      {notices.length > 0 ? (
        <>
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

          {hasMore ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                transform: 'translateY(-10px)',
              }}
            >
              <button
                type="button"
                style={buttonStyle}
                onClick={loadMoreNotices}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    loadMoreNotices();
                  }
                }}
              >
                <img src={more} alt="Load more" style={imgStyle} />
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                transform: 'translateY(-10px)',
              }}
            >
              더 이상 불러올 공지사항이 없습니다.
            </div>
          )}
        </>
      ) : (
        !hasMore && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100px',
              transform: 'translateY(-10px)',
            }}
          >
            더 이상 불러올 공지사항이 없습니다.
          </div>
        )
      )}
    </div>
  );
};

NoticeList.defaultProps = {
  noticeId: null, // 기본 값을 null로 설정하여 선택적 prop으로 만듭니다.
};

export default NoticeList;
