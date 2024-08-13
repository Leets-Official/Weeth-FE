import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';
import Utils from '../../hooks/Utils';

const StudyList = ({postId}) => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const { setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // API 호출 함수
  const fetchStudies = async (postId = null, count = 5) => {
    try {
      const params = { count: count || 5 };
      if (postId) {
        params.postId = postId;
      }
  
      console.log("Request Params:", params);
  
      const response = await axios.get(`${BASE_URL}/api/v1/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
  
      console.log("API Response:", response); // 응답 전체를 로그로 출력
  
      if (response.status === 200 && response.data.code === 200) {
        const studiesData = response.data.data;
        if (studiesData.length === 0) {
          console.log("No more studies to load.");
          return;
        }
        
        const newStudies = studiesData.map(study => ({
          id: study.id,
          name: study.name,
          title: study.title,
          content: study.content,
          time: study.time,
          commentCount: study.commentCount
        }));

        setStudies(prevStudies => [...prevStudies, ...newStudies]);
      } else {
        console.error("API Error:", response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Request Error:", error); // 요청 에러 로그 출력

      if (error.response && error.response.data && error.response.data.code === 400) {
        console.error("Error: Non-existent post ID.");
        setError("존재하지 않는 게시물입니다.");
      } else {
        // Utils를 사용하여 토큰 갱신 및 API 재시도
        try {
          const retryResponse = await Utils(error.response, fetchStudies, [postId, count], navigate);
          if (retryResponse) {
            setStudies(prevStudies => [...prevStudies, ...retryResponse.data.data]);
          }
        } catch (retryError) {
          setError('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
        }
      }
    }
  };

  // 컴포넌트 마운트 시 서버로부터 최신 데이터를 로드
  useEffect(() => {
    fetchStudies(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken]);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreStudies = () => {
    if (studies.length > 0) {
      const lastStudy = studies[studies.length - 1];
      if (lastStudy && lastStudy.id) {
        console.log('loadMoreStudies: Fetching with postId:', lastStudy.id, 'and count: 5');
        fetchStudies(lastStudy.id, 5);
      }
    } else {
      console.log('loadMoreStudies: Fetching initial studies with count: 5');
      fetchStudies(null, 5);
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigate = (study) => {
    navigate(`/board/posts/${study.id}`, { state: { type: 'study', data: study } });
  };

  return (
    <div>
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
      <button onClick={loadMoreStudies}>더 불러오기</button>
    </div>
  );
};

export default StudyList;
