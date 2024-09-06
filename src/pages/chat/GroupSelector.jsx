import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GroupSelector() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://edusphere.duckdns.org/api/chat-groups/')
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    const handleChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleGoToGroup = () => {
        if (selectedGroup) {
            navigate(`/chat/${selectedGroup}`);
        }
    };

    return (
        <div>
            <h2>Select Chat Group</h2>
            <select value={selectedGroup} onChange={handleChange}>
                <option value="">Select a group</option>
                {groups.map(group => (
                    <option key={group.id} value={group.name}>{group.name}</option>
                ))}
            </select>
            <button onClick={handleGoToGroup}>Go to Group</button>
        </div>
    );
}

export default GroupSelector;
