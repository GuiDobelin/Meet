import React, { useEffect, useContext, useState } from 'react';
import { getRooms } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const RoomList = () => {
    const { token } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await getRooms(token);
            setRooms(data);
        };

        fetchRooms();
    }, [token]);

    return (
        <div>
            <h2>Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        {room.name} - {room.participants.length} participants
                        {/* Adicione um botão ou link para JoinRoom aqui */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
