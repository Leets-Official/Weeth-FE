import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';

const StudyList = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const { setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchStudies = async (postId = null, count = 5) => {
    try {
      const params = { count };
      if (postId) {
        params.postId = postId;
      }
      
      const response = await axios.get(`${BASE_URL}/api/v1/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      if (response.data.code === 200) {
        setStudies(prevStudies => [...prevStudies, ...response.data.data]);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [accessToken]);

  useEffect(() => {
    studies.forEach(study => console.log('Study:', study));
  }, [studies]);

  const handleNavigate = (study) => {
    navigate(`/board/${study.id}`, { state: { type: 'study', data: study } });
  };

  const loadMoreStudies = () => {
    const lastStudy = studies[studies.length - 1];
    if (lastStudy) {
      fetchStudies(lastStudy.id);
    }
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
          totalComments={parseInt(study.totalComments, 10) || 0}
          onClick={() => handleNavigate(study)}
        />
      ))}
      <button onClick={loadMoreStudies}>더 불러오기</button>
    </div>
  );
};

export default StudyList;
