import React, { useEffect, useRef } from 'react';

const CanvasPreview = ({ width, height, elements }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw all elements
        elements.forEach(el => {
        if (el.type === 'rectangle') {
            ctx.fillRect(el.x, el.y, el.width, el.height);
        } else if (el.type === 'circle') {
            ctx.beginPath();
            ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
            ctx.fill();
        } else if (el.type === 'text') {
            ctx.font = '20px Arial';
            ctx.fillText(el.text, el.x, el.y);
        } else if (el.type === 'image') {
            const img = new Image();
            img.onload = () => {
            ctx.drawImage(img, el.x, el.y, el.width, el.height);
            };
            img.src = el.imageUrl;
        }
        });

    }, [elements, width, height]);

    return (
        <div>
        <h2>Preview</h2>
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ border: '1px solid black' }}
        />
        </div>
    );
};

export default CanvasPreview;
