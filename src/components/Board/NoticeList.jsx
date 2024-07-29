import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardComponent from './BoardComponent';
import { EventContext } from '../../hooks/EventContext';

const NoticeList = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const { setError } = useContext(EventContext);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    axios
      .get('http://13.125.78.31:8080/notice', { headers })
      .then((response) => {
        if (response.data.code === 200) {
          const noticeData = response.data.data.filter(
            (item) => item.type === 'NOTICE',
          );
          setNotices(noticeData);
          console.log(noticeData);
        } else {
          console.error('API response error:', response.data.message);
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err);
        setError('An error occurred while fetching the data');
      });
  }, [ACCESS_TOKEN, setError]);

  const handleNavigate = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      {notices.map((notice) => (
        <BoardComponent
          key={notice.id}
          name={notice.userName}
          title={notice.title}
          content={notice.content}
          time={notice.modifiedAt || notice.createdAt} // 수정된 시간이 있으면 수정된 시간, 없으면 생성 시간
          totalComments=""
          onClick={() => handleNavigate(notice.id)}
        />
      ))}
    </div>
  );
};

export default NoticeList;
