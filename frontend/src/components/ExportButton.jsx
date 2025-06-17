import React from 'react';
import API from '../api';

const ExportButton = ({ canvasId }) => {
    const handleExport = () => {
        window.open(`http://localhost:5000/api/canvas/export?id=${canvasId}`);
    };

    return (
        <div>
        <button onClick={handleExport}style={{
        padding: '10px 20px',
        background: '#28a745', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    }}
    >
    Export PDF
    </button>
    </div>
    );
};

export default ExportButton;
