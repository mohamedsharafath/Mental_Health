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
            <button className='toolbar_button' onClick={() => onToolChange('brush')}>Brush</button>
            <button className='toolbar_button' onClick={() => onToolChange('eraser')}>Eraser</button>
            <button className='toolbar_button' onClick={() => onToolChange('line')}>Line</button>
            <button className='toolbar_button' onClick={() => onToolChange('rectangle')}>Rectangle</button>
            <button className='toolbar_button' onClick={() => onToolChange('circle')}>Circle</button>
            <button className='toolbar_button clear-button' onClick={() => window.location.reload()} >
                Clear Canvas
            </button>
        </div>
    );
}

export default Toolbar;
