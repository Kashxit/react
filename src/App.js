import React, { useState } from 'react';
import IssueTaskButton from './components/IssueTaskButton';
import Sidebar from './components/Sidebar';

const App = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [editing, setEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('issue'); 
    const handleSelectItem = (item, type) => {
        setSelectedItem({ ...item, type });
        setEditing(false);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditing(true);
    };

    const handleDelete = (id) => {
       
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar setActiveTab={setActiveTab} />
            <main style={{ flex: 1, padding: '20px' }}>
                {activeTab === 'issue' && (
                    <IssueTaskButton
                        label="Add Issue"
                        onSelectItem={handleSelectItem}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                {activeTab === 'task' && (
                    <IssueTaskButton
                        label="Add Task"
                        onSelectItem={handleSelectItem}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
                {selectedItem && !editing && (
                    <div>
                        <h2>Viewing {selectedItem.type}</h2>
                        <p>Title: {selectedItem.title}</p>
                    </div>
                )}
                {editing && (
                    <div>
                        <h2>Edit {selectedItem.type}</h2>
                        <p>Editing Title: {selectedItem.title}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
