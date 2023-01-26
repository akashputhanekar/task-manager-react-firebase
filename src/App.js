import './style/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/context/auth/AuthContext';
import Login from './components/authentication/login/Login';
import Logout from './components/authentication/logout/Logout';
import Home from './components/tasks/task-manager/TaskManager';

function App() {
    const { currentUser } = useContext(AuthContext);
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />;
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='login' element={<Login />} />
                        <Route path='logout' element={<Logout />} />
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route path='manage-tasks'>
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <Home />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
