import React from 'react';
import './Sidebar.css'; 
const Sidebar = ({ setActiveTab }) => {
    return (
        <div className="sidebar">
            <h2>Home</h2>
            <button onClick={() => setActiveTab('issue')}>Manage Issues</button>
            <button onClick={() => setActiveTab('task')}>Manage Tasks</button>
        </div>
    );
};

export default Sidebar;
