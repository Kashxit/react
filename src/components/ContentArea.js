import React from 'react';
const ContentArea = ({ selectedItem, contentType }) => {
    if (!selectedItem) {
        return <div>Select an item to view details.</div>;
    }
    return (
        <div>
            <h2>{contentType === 'issue' ? 'Issue Details' : 'Task Details'}</h2>
            <p><strong>Title:</strong> {selectedItem.title}</p>
            {contentType === 'issue' && <p><strong>Details:</strong> {selectedItem.body}</p>}
        </div>
    );
};

export default ContentArea;
