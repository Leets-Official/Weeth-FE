import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';
import Utils from '../../hooks/Utils';

const StudyList = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const { setError } = useContext(BoardContext);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get('http://13.125.78.31:8080/posts', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Authorization-refresh': `Bearer ${refreshToken}`,
          },
        });

        // Utils 함수를 통해 응답을 처리
        const validatedResponse = await Utils(
          response,
          axios.get,
          [
            'http://13.125.78.31:8080/posts',
            { headers: { Authorization: `Bearer ${accessToken}` } },
          ],
          navigate,
        );

        if (validatedResponse.data.code === 200) {
          const { data } = validatedResponse;
          console.log('Study List:', data); // API 응답 데이터 확인

          if (Array.isArray(data.data)) {
            setStudies(data.data); // 상태 업데이트
            setError(null);
          } else {
            setStudies([]);
            setError('Unexpected response format');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchStudies();
  }, [ACCESS_TOKEN, setError, navigate]);

  useEffect(() => {
    console.log('Studies state updated:', studies); // 상태 업데이트 후의 데이터를 확인
  }, [studies]);

  const handleNavigate = (id) => {
    navigate(`/board/${id}`);
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
          totalComments={study.totalComments}
          onClick={() => handleNavigate(study.id)}
        />
      ))}
    </div>
  );
};

export default StudyList;
