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
import BoardPosting from './pages/BoardPosting';


import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<EventDetails />} />
        <Route path="/attendCheck" element={<AttendCheck />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/detail" element={<MemberDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/dues" element={<Dues />} />
        <Route path="/posting" element={<BoardPosting />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
