// src/pages/RoomPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Erro ao buscar sala:', error);
            }
        };

        fetchRoom();
    }, [id]);

    const handleJoin = async () => {
        try {
            await axios.post(`http://localhost:5000/api/rooms/${id}/join`);
            alert('Você entrou na sala com sucesso!');
            // Redirecionar ou atualizar o estado conforme necessário
        } catch (error) {
            console.error('Erro ao entrar na sala:', error);
            alert('Erro ao entrar na sala');
        }
    };

    if (!room) return <div>Carregando...</div>;

    return (
        <div>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <p>Capacidade: {room.capacity}</p>
            <button onClick={handleJoin}>Entrar na Sala</button>
        </div>
    );
};

export default RoomPage;
