import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import more from '../../assets/images/ic_moreButton.svg';
import theme from '../../styles/theme';
import BoardComponent from './BoardComponent';

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-family: ${theme.font.regular};
`;

const StudyList = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // API 호출 함수
  const fetchStudies = async (postId = null, count = 15) => {
    try {
      const params = { count: count || 15 };
      if (postId) {
        params.postId = postId;
      }
      const response = await api.get(`/api/v1/posts`, {
        params,
      });

      if (response.status === 200 && response.data.code === 200) {
        const studiesData = response.data.data;

        if (studiesData.length === 0) {
          setHasMore(false);
        } else {
          const newStudies = studiesData.map((study) => ({
            id: study.id,
            name: study.name,
            title: study.title,
            content: study.content,
            time: study.time,
            commentCount: study.commentCount,
          }));

          setStudies((prevStudies) => [...prevStudies, ...newStudies]);
          setHasMore(!response.data.isLastPage);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      // console.error('Request Error:', error); // 요청 에러 로그 출력

      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 400
      ) {
        // console.error('Error: Non-existent post ID.');
      } else {
        setHasMore(false); // 재시도 중에도 오류가 발생했으므로 더 이상 로드할 공지가 없다고 처리
      }
    }
  };

  // 컴포넌트 마운트 시 서버로부터 최신 데이터를 로드
  useEffect(() => {
    fetchStudies(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, []);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreStudies = () => {
    if (studies.length > 0) {
      const lastStudy = studies[studies.length - 1];
      if (lastStudy && lastStudy.id) {
        fetchStudies(lastStudy.id, 15);
      }
    } else {
      fetchStudies(null, 15);
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigate = (study) => {
    navigate(`/study/${study.id}`, {
      state: { type: 'study', data: study },
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
      {studies.length > 0 ? (
        <>
          {studies.map((study) => (
            <BoardComponent
              key={study.id}
              name={study.name}
              title={study.title}
              content={study.content}
              time={study.time}
              totalComments={parseInt(study.commentCount, 10) || 0}
              onClick={() => handleNavigate(study)}
            />
          ))}

          {hasMore ? (
            <StyledText>
              <button
                type="button"
                style={buttonStyle}
                onClick={loadMoreStudies}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    loadMoreStudies();
                  }
                }}
              >
                <img src={more} alt="Load more" style={imgStyle} />
              </button>
            </StyledText>
          ) : (
            <StyledText>더 이상 불러올 게시물이 없습니다.</StyledText>
          )}
        </>
      ) : (
        !hasMore && <StyledText>더 이상 불러올 게시물이 없습니다.</StyledText>
      )}
    </div>
  );
};

export default StudyList;
