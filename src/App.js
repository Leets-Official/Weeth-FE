import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/fonts/fonts.css';

import Attendance from './pages/Attendance';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetail';
import Member from './pages/Member';
import MemberDetail from './pages/MemberDetail';
import MyPage from './pages/MyPage';
import Edit from './pages/Edit';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event" element={<EventDetails />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/detail" element={<MemberDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
