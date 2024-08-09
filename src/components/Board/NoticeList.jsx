/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardComponent from './BoardComponent';
import { BoardContext } from '../../hooks/BoardContext';

const NoticeList = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const { setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchNotices = async (noticeId = null, count = 2) => {
    try {
      const params = { count };
      if (noticeId) {
        params.noticeId = noticeId;
      }

      const response = await axios.get(`${BASE_URL}/api/v1/notices`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      if (response.data.code === 200) {
        setNotices((prevNotices) => [...prevNotices, ...response.data.data]);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('공지사항 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [accessToken]);

  useEffect(() => {
    notices.forEach((notice) => console.log('Notice:', notice));
  }, [notices]);

  const handleNavigate = (notice) => {
    navigate(`/board/${notice.id}`, {
      state: { type: 'notice', data: notice },
    });
  };

  const loadMoreNotices = () => {
    const lastNotice = notices[notices.length - 1];
    if (lastNotice) {
      fetchNotices(lastNotice.id);
    }
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
          totalComments={parseInt(notice.totalComments, 10) || 0}
          onClick={() => handleNavigate(notice)}
        />
      ))}
      <button onClick={loadMoreNotices}>더 불러오기</button>
    </div>
  );
};

export default NoticeList;
