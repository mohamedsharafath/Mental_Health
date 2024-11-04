import React, { useState } from 'react';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import './PaintApp.css';

function PaintApp() {
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState('brush'); // 'brush', 'eraser', 'line', 'rectangle', 'circle'

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleBrushSizeChange = (newSize) => {
        setBrushSize(newSize);
    };

    return (
        <div className="paint-app">
            <Toolbar 
                color={color} 
                onColorChange={handleColorChange} 
                brushSize={brushSize} 
                onBrushSizeChange={handleBrushSizeChange}
                onToolChange={setTool}
            />
            <Canvas color={color} brushSize={brushSize} tool={tool} />
        </div>
    );
}

export default PaintApp;
