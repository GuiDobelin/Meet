
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/rooms/create', {
                name,
                description,
                capacity,
            });
            console.log(response.data);
            navigate('/rooms');
        } catch (error) {
            console.error('Erro ao criar sala:', error);
        }
    };

    return (
        <div>
            <h1>Criar Nova Sala</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Capacidade:</label>
                    <input 
                        type="number" 
                        value={capacity} 
                        onChange={(e) => setCapacity(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Criar Sala</button>
            </form>
        </div>
    );
};

export default CreateRoomPage;
