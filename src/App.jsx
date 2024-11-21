/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */

import { Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/fonts/fonts.css';

import { ThemeProvider } from 'styled-components';
import Attendance from '@/pages/Attendance';
import Calendar from '@/pages/Calendar';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Signup from '@/pages/Signup';
import EventDetails from '@/pages/EventDetails';
import AttendCheck from '@/pages/AttendCheck';
import Member from '@/pages/Member';
import MemberDetail from '@/pages/MemberDetail';
import MyPage from '@/pages/MyPage';
import Edit from '@/pages/Edit';
import Dues from '@/pages/Dues';
import Board from '@/pages/Board';
import StudyPosting from '@/pages/StudyPosting';
import NoticePosting from '@/pages/NoticePosting';
import EventAdmin from '@/pages/EventAdmin';
import StudyDetail from '@/pages/StudyDetail';
import NoticeDetail from '@/pages/NoticeDetail';

import theme from '@/styles/theme';
import Receipt from '@/pages/Receipt';

import { UserProvider } from '@/api/UserContext';
import { MonthlyScheduleProvider } from '@/api/MonthlyScheduleContext';
import { BoardProvider } from '@/api/BoardContext';
import { DuesProvider } from '@/api/DuesContext';
import { NoticeProvider } from '@/api/NoticeContext';
import { YearlyScheduleProvider } from '@/api/YearlyScheduleContext';
import { AttendCheckProvider } from '@/api/AttendCheckContext';

import ScrollToTop from '@/hooks/ScrollToTop';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <MonthlyScheduleProvider>
          <BoardProvider>
            <DuesProvider>
              <NoticeProvider>
                <YearlyScheduleProvider>
                  <AttendCheckProvider>
                    <ScrollToTop />
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/attendance" element={<Attendance />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/:type/:id" element={<EventDetails />} />
                      <Route path="/event/create" element={<EventAdmin />} />
                      <Route path="/event/:id/edit" element={<EventAdmin />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/attendCheck" element={<AttendCheck />} />
                      <Route path="/member" element={<Member />} />
                      <Route path="/member/:id" element={<MemberDetail />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/edit" element={<Edit />} />
                      <Route path="/dues" element={<Dues />} />
                      <Route path="/receipt" element={<Receipt />} />
                      <Route path="/board" element={<Board />} />
                      <Route path="/study/:id" element={<StudyDetail />} />
                      <Route path="/notice/:id" element={<NoticeDetail />} />
                      <Route path="/study/post" element={<StudyPosting />} />
                      <Route path="/notice/post" element={<NoticePosting />} />
                    </Routes>
                  </AttendCheckProvider>
                </YearlyScheduleProvider>
              </NoticeProvider>
            </DuesProvider>
          </BoardProvider>
        </MonthlyScheduleProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
