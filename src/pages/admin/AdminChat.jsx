import React, { useState, useEffect } from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminChat = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [isCreateMode, setIsCreateMode] = useState(false);

    // Fetch the list of rooms from the API
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('https://edusphere.duckdns.org/chat2/rooms/');
            setRooms(response.data);
        } catch (error) {
            toast.error('Error fetching rooms');
        }
    };

    // Delete a room by id
    const deleteRoom = async (id) => {
        try {
            await axios.delete(`https://edusphere.duckdns.org/chat2/rooms/delete/${id}/`);
            toast.success('Room deleted successfully');
            fetchRooms(); // Refresh the room list
        } catch (error) {
            toast.error('Error deleting room');
        }
    };

    // Handle room creation
    const createRoom = async () => {
        if (newRoomName.trim() === '') {
            toast.error('Room name cannot be empty');
            return;
        }

        try {
            await axios.post('https://edusphere.duckdns.org/chat2/rooms/create/', { room_name: newRoomName });
            toast.success('Room created successfully');
            fetchRooms(); // Refresh the room list
            setNewRoomName('');
            setIsCreateMode(false);
        } catch (error) {
            toast.error('Error creating room');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-4 flex-grow">
                        <h2 className="text-2xl font-bold mb-4">Admin Chat</h2>

                        {/* Create Room Button */}
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsCreateMode(true)}
                            >
                                Create Room
                            </button>
                        </div>

                        {/* Table to display chat rooms */}
                        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Room Name</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td className="border text-center px-4 py-2">{room.id}</td>
                                        <td className="border text-center px-4 py-2">{room.room_name}</td>
                                        <td className="border text-center px-4 py-2">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => deleteRoom(room.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal for Creating Room */}
                        {isCreateMode && (
                            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                    <h2 className="text-xl font-bold mb-4">Create a New Room</h2>
                                    <input
                                        type="text"
                                        className="border p-2 mb-4 w-full"
                                        placeholder="Enter room name"
                                        value={newRoomName}
                                        onChange={(e) => setNewRoomName(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                            onClick={createRoom}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                            onClick={() => setIsCreateMode(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
