import React from 'react';
import './Toolbar.css';

function Toolbar({ color, onColorChange, brushSize, onBrushSizeChange, onToolChange }) {
    return (
        <div className="toolbar">
            <input 
                type="color" 
                value={color} 
                onChange={(e) => onColorChange(e.target.value)} 
                className="color-picker"
            />
            <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => onBrushSizeChange(e.target.value)}
                className="brush-size"
            />
            <button onClick={() => onToolChange('brush')}>Brush</button>
            <button onClick={() => onToolChange('eraser')}>Eraser</button>
            <button onClick={() => onToolChange('line')}>Line</button>
            <button onClick={() => onToolChange('rectangle')}>Rectangle</button>
            <button onClick={() => onToolChange('circle')}>Circle</button>
            <button onClick={() => window.location.reload()} className="clear-button">
                Clear Canvas
            </button>
        </div>
    );
}

export default Toolbar;
