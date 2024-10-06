// src/pages/RoomListPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoomListPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms/list');
                setRooms(response.data);
            } catch (error) {
                console.error('Erro ao buscar salas:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Lista de Salas</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room._id}>
                        <Link to={`/rooms/${room._id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-room">Criar Nova Sala</Link>
        </div>
    );
};

export default RoomListPage;
