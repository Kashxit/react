import React, { useState, useEffect, useCallback } from 'react';
import { createIssue, createTask, getIssues, getTasks, updateIssue, updateTask, deleteIssue, deleteTask } from '../api/api';
import './Sidebar.css';

const IssueTaskButton = ({ label, onSelectItem, onEdit, onDelete }) => {
    const [items, setItems] = useState([]);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [editItemTitle, setEditItemTitle] = useState('');

    const fetchItems = useCallback(async () => {
        try {
            const response = label === 'Add Issue' ? await getIssues() : await getTasks();
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, [label]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleCreate = async () => {
        try {
            if (!newItemTitle.trim()) {
                console.error('Title cannot be empty');
                return;
            }

            const newItem = { title: newItemTitle };
            const response = label === 'Add Issue' ? await createIssue(newItem) : await createTask(newItem);


            if (response.data) {
                setItems([...items, response.data]);
                setNewItemTitle('');
            } else {
                console.error('No data returned from API');
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const handleUpdate = async () => {
        if (editingItem) {
            try {
                const updatedItem = { title: editItemTitle };
                const response = label === 'Add Issue' ? await updateIssue(editingItem.id, updatedItem) : await updateTask(editingItem.id, updatedItem);

                if (response.data) {
                    setItems(items.map(item => item.id === editingItem.id ? response.data : item));
                    setEditingItem(null);
                    setEditItemTitle('');
                } else {
                    console.error('No data returned from API');
                }
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            if (label === 'Add Issue') {
                await deleteIssue(id);
            } else {
                await deleteTask(id);
            }
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setEditItemTitle(item.title);
    };

    return (
        <div className="issue-task-container">
            <div className="issue-task-form">
                <input
                    type="text"
                    className="issue-task-input"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                    placeholder={`New ${label.split(' ')[1]}`}
                />
                <button className="issue-task-button" onClick={handleCreate}>
                    {label}
                </button>
                {editingItem && (
                    <div className="issue-task-edit-form">
                        <input
                            type="text"
                            className="issue-task-input"
                            value={editItemTitle}
                            onChange={(e) => setEditItemTitle(e.target.value)}
                            placeholder={`Edit ${label.split(' ')[1]}`}
                        />
                        <button className="issue-task-button" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                )}
            </div>
            <ul className="issue-task-list">
                {items.map(item => (
                    <li key={item.id} className="issue-task-list-item">
                        {item.title}
                        <button className="issue-task-button" onClick={() => startEditing(item)}>Edit</button>
                        <button className="issue-task-button" onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IssueTaskButton;
