import './App.css';
import './assets/fonts/fonts.css';

import { AttendCheckProvider } from '@/api/AttendCheckContext';
import { BoardProvider } from '@/api/BoardContext';
import { DuesProvider } from '@/api/DuesContext';
import { NoticeProvider } from '@/api/NoticeContext';
import { UserProvider } from '@/api/UserContext';

import ScrollToTop from '@/hooks/ScrollToTop';
import Attendance from '@/pages/Attendance';
import AttendCheck from '@/pages/AttendCheck';
import Board from '@/pages/Board';
import BoardPost from '@/pages/BoardPost';
import Calendar from '@/pages/Calendar';
import Dues from '@/pages/Dues';
import Edit from '@/pages/Edit';
import EventAdmin from '@/pages/EventAdmin';
import EventDetails from '@/pages/EventDetails';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Member from '@/pages/Member';
import MemberDetail from '@/pages/MemberDetail';
import MyPage from '@/pages/MyPage';
import NoticeDetail from '@/pages/NoticeDetail';
import Profile from '@/pages/Profile';
import Receipt from '@/pages/Receipt';
import Signup from '@/pages/Signup';
import StudyDetail from '@/pages/StudyDetail';
import theme from '@/styles/theme';

import AdminAttendance from '@/pages/admin/AdminAttendance';
import AdminMember from '@/pages/admin/AdminMember';
import AdminDues from '@/pages/admin/AdminDues';
import AdminPenatly from '@/pages/admin/AdminPenatly';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BoardProvider>
          <DuesProvider>
            <NoticeProvider>
              <AttendCheckProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/:type/:id" element={<EventDetails />} />
                  <Route path="/events/create" element={<EventAdmin />} />
                  <Route path="/events/:id/edit" element={<EventAdmin />} />
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
                  <Route path="/study/post" element={<BoardPost />} />
                  <Route path="/notice/post" element={<BoardPost />} />
                  <Route
                    path="/admin/attendance"
                    element={<AdminAttendance />}
                  />
                  <Route path="/admin/member" element={<AdminMember />} />
                  <Route path="/admin/dues" element={<AdminDues />} />
                  <Route path="/admin/penalty" element={<AdminPenatly />} />
                </Routes>
              </AttendCheckProvider>
            </NoticeProvider>
          </DuesProvider>
        </BoardProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
