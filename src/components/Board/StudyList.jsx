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

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.code === 200) {
          setStudies(response.data.data); // 필터링 없이 모든 데이터를 설정
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('스터디 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchStudies();
  }, [accessToken, setError]);

  useEffect(() => {
    studies.forEach(study => console.log('Study:', study));
  }, [studies]);

  const handleNavigate = (study) => {
    navigate(`/board/${study.id}`, { state: { type: 'study', data: study } });
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
    </div>
  );
};

export default StudyList;