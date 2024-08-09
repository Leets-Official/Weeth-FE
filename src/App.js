/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */

import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/fonts/fonts.css';

import { ThemeProvider } from 'styled-components';
import Attendance from './pages/Attendance';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import AttendCheck from './pages/AttendCheck';
import Member from './pages/Member';
import MemberDetail from './pages/MemberDetail';
import MyPage from './pages/MyPage';
import Edit from './pages/Edit';
import Dues from './pages/Dues';
import Board from './pages/Board';
import BoardPosting from './pages/BoardPosting';
import BoardDetail from './pages/BoardDetail';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import BoardEdit from './pages/BoardEdit';

import theme from './styles/theme';
import Receipt from './pages/Receipt';

import { UserProvider } from './hooks/UserContext';
import UserAPI from './hooks/UserAPI';
import { MonthlyScheduleProvider } from './hooks/MonthlyScheduleContext';
import MonthlyScheduleAPI from './hooks/MonthlyScheduleAPI';
import { BoardProvider } from './hooks/BoardContext';
import { DuesProvider } from './hooks/DuesContext';
import { EventInfoProvider } from './hooks/EventInfoContext';
import { NoticeProvider } from './hooks/NoticeContext';
import { AttendProvider } from './hooks/AttendContext';
import { AttendCheckProvider } from './hooks/AttendCheckContext';
import PrivateRoute from './router/PrivateRouter';
import { PenaltyProvider } from './hooks/PenaltyContext';

// user api 받아온 정보 담는 context

const App = () => {
  const access = localStorage.getItem('accessToken');
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <MonthlyScheduleProvider>
          <BoardProvider>
            <DuesProvider>
              <EventInfoProvider>
                <NoticeProvider>
                  <AttendProvider>
                    <AttendCheckProvider>
                      <PenaltyProvider>
                        <UserAPI />
                        <MonthlyScheduleAPI />
                        <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/event/:id" element={<EventDetails />} />
                        <Route path="/event/create" element={<CreateEvent />} />
                        <Route path="/event/:id/edit" element={<EditEvent />} />
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
                        <Route path="/board/:id" element={<BoardDetail />} />
                        <Route
                          path="/boardPosting"
                          element={<BoardPosting />}
                        />
                        <Route path="/boardEdit" element={<BoardEdit />} />
                        </Routes>
                      </PenaltyProvider>
                    </AttendCheckProvider>
                  </AttendProvider>
                </NoticeProvider>
              </EventInfoProvider>
            </DuesProvider>
          </BoardProvider>
        </MonthlyScheduleProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
