import React, { useState } from 'react';
import API from '../api';

const CanvasForm = ({ setCanvasId, setCanvasWidth, setCanvasHeight }) => {
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);

    const handleInit = async () => {
        const id = Date.now().toString();
        await API.post('/init', { id, width, height });
        setCanvasId(id);
        setCanvasWidth(width);
        setCanvasHeight(height);
        alert('Canvas Initialized!');
    };

    return (
        <div>
        <h2>Initialize Canvas</h2>
        <input value={width} onChange={e => setWidth(+e.target.value)} placeholder="Width" />
        <input value={height} onChange={e => setHeight(+e.target.value)} placeholder="Height" />
        <button onClick={handleInit}style={{
        padding: '10px 20px',
        background: '#007bff',  
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    }}
    >
    Create Canvas
    </button>
    </div>
  );
};

export default CanvasForm;
