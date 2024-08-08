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
                          <Route
                            path="/attendance"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Attendance />}
                              />
                            }
                          />
                          <Route
                            path="/calendar"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Calendar />}
                              />
                            }
                          />
                          <Route
                            path="/event/:id"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<EventDetails />}
                              />
                            }
                          />
                          <Route
                            path="/event/create"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<CreateEvent />}
                              />
                            }
                          />
                          <Route
                            path="/event/:id/edit"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<EditEvent />}
                              />
                            }
                          />
                          <Route path="/home" element={<Home />} />
                          <Route
                            path="/signup"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Signup />}
                              />
                            }
                          />
                          <Route
                            path="/profile"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Profile />}
                              />
                            }
                          />
                          <Route
                            path="/attendCheck"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<AttendCheck />}
                              />
                            }
                          />
                          <Route
                            path="/member"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Member />}
                              />
                            }
                          />
                          <Route
                            path="/member/:id"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<MemberDetail />}
                              />
                            }
                          />
                          <Route
                            path="/mypage"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<MyPage />}
                              />
                            }
                          />
                          <Route
                            path="/edit"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Edit />}
                              />
                            }
                          />
                          <Route
                            path="/dues"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Dues />}
                              />
                            }
                          />
                          <Route
                            path="/receipt"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Receipt />}
                              />
                            }
                          />
                          <Route
                            path="/board"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<Board />}
                              />
                            }
                          />
                          <Route
                            path="/board/:id"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<BoardDetail />}
                              />
                            }
                          />
                          <Route
                            path="/boardPosting"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<BoardPosting />}
                              />
                            }
                          />
                          <Route
                            path="/boardEdit"
                            element={
                              <PrivateRoute
                                authenticated={access}
                                component={<BoardEdit />}
                              />
                            }
                          />
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
