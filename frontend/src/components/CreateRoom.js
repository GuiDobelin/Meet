import React, { useState, useContext } from 'react';
import { createRoom } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const CreateRoom = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const { token } = useContext(AuthContext);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        await createRoom({ name, description, capacity }, token);
        // Redirecionar ou atualizar a lista de salas após a criação
    };

    return (
        <form onSubmit={handleCreateRoom}>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Room Name" required />
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="number" onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" required />
            <button type="submit">Create Room</button>
        </form>
    );
};

export default CreateRoom;
