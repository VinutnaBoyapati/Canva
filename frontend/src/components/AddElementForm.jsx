import React, { useState } from 'react';
import API from '../api';

const AddElementForm = ({ canvasId, elements, setElements, canvasWidth, canvasHeight }) => {
    const [type, setType] = useState('rectangle');
    const [params, setParams] = useState({});
    const [file, setFile] = useState(null);
    const [imageReady, setImageReady] = useState(false); // new flag

    const handleAdd = async () => {
        if (!canvasId) {
        alert('Canvas not initialized');
        return;
        }

        try {
        if (type === 'image') {
            const formData = new FormData();
            formData.append('id', canvasId);
            formData.append('x', params.x);
            formData.append('y', params.y);
            formData.append('width', params.width);
            formData.append('height', params.height);
            formData.append('image', file);

            console.log('Uploading image with:', {
            id: canvasId,
            ...params,
            file
            });

            await API.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newElement = { type, ...params, imageUrl: URL.createObjectURL(file) };
            setElements([...elements, newElement]);
        } else {
            await API.post('/add', { id: canvasId, type, ...params });
            const newElement = { type, ...params };
            setElements([...elements, newElement]);
        }

        alert(`${type} added!`);
        setParams({});
        setFile(null);
        setImageReady(false); // reset for next image

        } catch (err) {
        console.error(err);
        alert('Error adding element');
        }
    };

    return (
        <div>
        <h2>Add Element</h2>
        <select value={type} onChange={e => { 
            setType(e.target.value); 
            setParams({}); 
            setImageReady(false);
        }}>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="text">Text</option>
            <option value="image">Image (upload)</option>
        </select>

        <div>
            {type === 'rectangle' && <>
            <input placeholder="x" type="number" onChange={e => setParams({...params, x: +e.target.value})} />
            <input placeholder="y" type="number" onChange={e => setParams({...params, y: +e.target.value})} />
            <input placeholder="width" type="number" onChange={e => setParams({...params, width: +e.target.value})} />
            <input placeholder="height" type="number" onChange={e => setParams({...params, height: +e.target.value})} />
            </>}
            {type === 'circle' && <>
            <input placeholder="x" type="number" onChange={e => setParams({...params, x: +e.target.value})} />
            <input placeholder="y" type="number" onChange={e => setParams({...params, y: +e.target.value})} />
            <input placeholder="radius" type="number" onChange={e => setParams({...params, radius: +e.target.value})} />
            </>}
            {type === 'text' && <>
            <input placeholder="x" type="number" onChange={e => setParams({...params, x: +e.target.value})} />
            <input placeholder="y" type="number" onChange={e => setParams({...params, y: +e.target.value})} />
            <input placeholder="text" onChange={e => setParams({...params, text: e.target.value})} />
            </>}
            {type === 'image' && <>
            <input placeholder="x" type="number" onChange={e => setParams({...params, x: +e.target.value})} />
            <input placeholder="y" type="number" onChange={e => setParams({...params, y: +e.target.value})} />
            <input placeholder="width" type="number" value={params.width || ''} onChange={e => setParams({...params, width: +e.target.value})} />
            <input placeholder="height" type="number" value={params.height || ''} onChange={e => setParams({...params, height: +e.target.value})} />
            <input
                type="file"
                accept="image/*"
                onChange={e => {
                const file = e.target.files[0];
                setFile(file);
                setImageReady(false); // clear

                if (file) {
                    const img = new Image();
                    img.onload = () => {
                    const imgWidth = img.width;
                    const imgHeight = img.height;

                    const maxWidth = canvasWidth;
                    const maxHeight = canvasHeight;

                    const widthRatio = maxWidth / imgWidth;
                    const heightRatio = maxHeight / imgHeight;
                    const scale = Math.min(widthRatio, heightRatio, 1);

                    const newWidth = Math.floor(imgWidth * scale);
                    const newHeight = Math.floor(imgHeight * scale);

                    console.log('Auto-fit:', newWidth, newHeight);

                    setParams(p => ({
                        ...p,
                        width: newWidth,
                        height: newHeight,
                    }));

                    setImageReady(true); // mark as ready
                    };
                    img.src = URL.createObjectURL(file);
                }
                }}
            />
            </>}
        </div>

        <button
    onClick={handleAdd}
    disabled={type === 'image' && (!file || !imageReady)}
    style={{
        backgroundColor: '#007bff', // Bootstrap primary blue
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: type === 'image' && (!file || !imageReady) ? 'not-allowed' : 'pointer',
        opacity: type === 'image' && (!file || !imageReady) ? 0.6 : 1
    }}
>
    Add
</button>

        </div>
    );
};

export default AddElementForm;
