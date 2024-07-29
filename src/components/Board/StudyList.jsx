import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';

const StudyList = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const { setError } = useContext(BoardContext);
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get('http://13.125.78.31:8080/posts', {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
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
  }, [ACCESS_TOKEN, setError]);

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
