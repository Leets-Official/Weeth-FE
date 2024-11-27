/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */

import './App.css';
import { Route, Routes } from 'react-router-dom';
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
import EventAdmin from '@/pages/EventAdmin';
import StudyDetail from '@/pages/StudyDetail';
import NoticeDetail from '@/pages/NoticeDetail';

import theme from '@/styles/theme';
import Receipt from '@/pages/Receipt';

import { UserProvider } from '@/api/UserContext';
import { MonthlyScheduleProvider } from '@/api/MonthlyScheduleContext';
import { DuesProvider } from '@/api/DuesContext';
import { EventInfoProvider } from '@/api/EventInfoContext';
import { NoticeProvider } from '@/api/GetAllPostsContext';
import { YearlyScheduleProvider } from '@/api/YearlyScheduleContext';
import { AttendCheckProvider } from '@/api/AttendCheckContext';

import ScrollToTop from '@/hooks/ScrollToTop';
import NoticeBoard from './pages/NoticeBoard';
import StudyBoard from './pages/StudyBoard';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <MonthlyScheduleProvider>
          <DuesProvider>
            <EventInfoProvider>
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
                      <Route path="/notice" element={<NoticeBoard />} />
                      <Route path="/study" element={<StudyBoard />} />
                      <Route path="/study/:id" element={<StudyDetail />} />
                      <Route path="/notice/:id" element={<NoticeDetail />} />
                      {/* <Route path="/study/post" element={<StudyPosting />} />
                        <Route
                          path="/notice/post"
                          element={<NoticePosting />}
                        /> */}
                    </Routes>
                  </AttendCheckProvider>
                </YearlyScheduleProvider>
              </NoticeProvider>
            </EventInfoProvider>
          </DuesProvider>
        </MonthlyScheduleProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
