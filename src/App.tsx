import './App.css';
import './assets/fonts/fonts.css';

import ScrollToTop from '@/hooks/ScrollToTop';
import Attendance from '@/pages/Attendance';
import AttendCheck from '@/pages/AttendCheck';
import Calendar from '@/pages/Calendar';
import Dues from '@/pages/Dues';
import Edit from '@/pages/Edit';
import EventPost from '@/pages/EventPost';
import EventDetail from '@/pages/EventDetail';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Member from '@/pages/Member';
import MemberDetail from '@/pages/MemberDetail';
import MyPage from '@/pages/MyPage';
import Profile from '@/pages/Profile';
import Receipt from '@/pages/Receipt';
import theme from '@/styles/theme';
import Redirect from '@/pages/Redirect';
import AccountCheck from '@/pages/AccountCheck';
import RegistrationSuccess from '@/pages/RegistrationSuccess';
import WaitingApproval from '@/pages/WaitingApproval';

import AdminAttendance from '@/pages/admin/AdminAttendance';
import AdminMember from '@/pages/admin/AdminMember';
import AdminDues from '@/pages/admin/AdminDues';
import AdminPenalty from '@/pages/admin/AdminPenalty';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Notice from '@/pages/Notice';
import NoticeDetail from '@/pages/NoticeDetail';
import BoardDetail from '@/pages/BoardDetail';
import Board from '@/pages/Board';
import BoardNoticePost from '@/pages/BoardNoticePost';
import BoardNoticeEdit from '@/pages/BoardNoticeEdit';
import { CustomToastContainer } from '@/components/common/ToastMessage';
import BoardSearch from '@/pages/BoardSearch';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomToastContainer limit={1} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kakao/oauth" element={<Redirect />} />
        <Route path="/accountcheck" element={<AccountCheck />} />
        <Route path="/register-success" element={<RegistrationSuccess />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/:type/:id" element={<EventDetail />} />
        <Route path="/events/create" element={<EventPost />} />
        <Route path="/:type/:id/edit" element={<EventPost />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attendCheck" element={<AttendCheck />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/:userId" element={<MemberDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/dues" element={<Dues />} />
        <Route path="/receipt" element={<Receipt />} />

        <Route path="/:type/post" element={<BoardNoticePost />} />

        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:postId" element={<NoticeDetail />} />
        <Route path="/notice/:postId/edit" element={<BoardNoticeEdit />} />

        <Route path="/board" element={<Board />} />
        <Route path="/board/:postId" element={<BoardDetail />} />
        <Route path="/board/:postId/edit" element={<BoardNoticeEdit />} />
        <Route path="/board/search" element={<BoardSearch />} />

        <Route path="/admin" element={<AdminMember />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/member" element={<AdminMember />} />
        <Route path="/admin/dues" element={<AdminDues />} />
        <Route path="/admin/penalty" element={<AdminPenalty />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
