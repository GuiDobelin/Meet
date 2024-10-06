import React, { useState, useContext } from 'react';
import { joinRoom } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const JoinRoom = ({ roomId }) => {
    const { token } = useContext(AuthContext);

    const handleJoinRoom = async () => {
        await joinRoom(roomId, token);
    };

    return (
        <button onClick={handleJoinRoom}>Join Room</button>
    );
};

export default JoinRoom;
