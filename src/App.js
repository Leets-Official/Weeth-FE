import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/fonts/fonts.css';

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

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Receipt from './pages/Receipt';

import { UserProvider } from './hooks/UserContext';
import UserAPI from './hooks/UserAPI';
import { EventProvider } from './hooks/EventContext';
import EventAPI from './hooks/EventAPI';
import { BoardProvider } from './hooks/BoardContext';
import { DuesProvider } from './hooks/DuesContext';
import { EventInfoProvider } from './hooks/EventInfoContext';
import { NoticeProvider } from './hooks/NoticeContext';

//user api 받아온 정보 담는 context

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <EventProvider>
      <BoardProvider>
      <DuesProvider>
      <EventInfoProvider>
      <NoticeProvider>
      <UserAPI />
      <EventAPI />
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
          <Route path="/boardPosting" element={<BoardPosting />} />
          <Route path="/boardEdit" element={<BoardEdit />} />
        </Routes>
        </EventInfoProvider>
      </NoticeProvider>
        </DuesProvider>
        </BoardProvider>
        </EventProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;