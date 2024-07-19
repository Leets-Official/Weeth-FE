import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/fonts/fonts.css';

import Attendance from './pages/Attendance';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetail';
import User from './pages/User';
import UserDetail from './pages/UserDetail';

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
        <Route path="/user" element={<User />} />
        <Route path="/user/detail" element={<UserDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
