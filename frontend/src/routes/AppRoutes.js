import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RoomListPage from '../pages/RoomListPage';
import CreateRoomPage from '../pages/CreateRoomPage';
import RoomPage from '../pages/RoomPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rooms" element={<RoomListPage />} />
                <Route path="/rooms/create" element={<CreateRoomPage />} />
                <Route path="/rooms/:id" element={<RoomPage />} />
                <Route path="/" element={<LoginPage />} /> {/* Redirecionar para Login */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
