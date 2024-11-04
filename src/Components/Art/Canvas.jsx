import React, { useRef, useState, useEffect } from 'react';
import './Canvas.css';

function Canvas({ color, brushSize, tool }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [paths, setPaths] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [currentPath, setCurrentPath] = useState(null);
    const [brushType, setBrushType] = useState('solid'); // Default brush type

    useEffect(() => {
        redraw(); // Redraw canvas whenever paths change
    }, [paths]);

    const startDrawing = (e) => {
        const { x, y } = getCursorPosition(e);
        setStartPosition({ x, y });
        setIsDrawing(true);

        if (tool === 'brush' || tool === 'eraser') {
            setCurrentPath([{ x, y, tool, color: tool === 'eraser' ? '#ffffff' : color, brushSize, brushType }]);
        } else {
            setCurrentPath({ shape: tool, start: { x, y }, end: { x, y }, color, brushSize });
        }
    };

    const endDrawing = () => {
        if (!isDrawing) return;

        if (tool === 'brush' || tool === 'eraser') {
            setPaths([...paths, currentPath]);
        } else {
            setPaths([...paths, currentPath]);
        }
        setCurrentPath(null);
        setIsDrawing(false);
        setRedoStack([]); // Clear redo stack after new action
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const { x, y } = getCursorPosition(e);
        const ctx = canvasRef.current.getContext('2d');

        if (tool === 'brush' || tool === 'eraser') {
            const newPath = [...currentPath, { x, y, tool, color: tool === 'eraser' ? '#ffffff' : color, brushSize, brushType }];
            setCurrentPath(newPath);

            setBrushStyle(ctx, tool === 'eraser' ? 'solid' : brushType, color, brushSize);
            ctx.beginPath();
            ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            const newShape = { ...currentPath, end: { x, y } };
            setCurrentPath(newShape);
            redraw();
            ctx.lineWidth = brushSize;
            ctx.strokeStyle = color;

            switch (tool) {
                case 'line':
                    drawLine(ctx, newShape.start, newShape.end);
                    break;
                case 'rectangle':
                    drawRectangle(ctx, newShape.start, newShape.end);
                    break;
                case 'circle':
                    drawCircle(ctx, newShape.start, newShape.end);
                    break;
                default:
                    break;
            }
        }
    };

    const redraw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        paths.forEach((item) => {
            ctx.lineWidth = item.brushSize;
            ctx.strokeStyle = item.color;

            if (Array.isArray(item)) {
                ctx.beginPath();
                item.forEach((point, index) => {
                    setBrushStyle(ctx, point.tool === 'eraser' ? 'solid' : point.brushType, point.color, point.brushSize);
                    if (index === 0) ctx.moveTo(point.x, point.y);
                    else ctx.lineTo(point.x, point.y);
                });
                ctx.stroke();
            } else {
                ctx.strokeStyle = item.color;
                ctx.lineWidth = item.brushSize;
                switch (item.shape) {
                    case 'line':
                        drawLine(ctx, item.start, item.end);
                        break;
                    case 'rectangle':
                        drawRectangle(ctx, item.start, item.end);
                        break;
                    case 'circle':
                        drawCircle(ctx, item.start, item.end);
                        break;
                    default:
                        break;
                }
            }
        });
    };

    const setBrushStyle = (ctx, brushType, color, brushSize) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";

        switch (brushType) {
            case 'dotted':
                ctx.setLineDash([brushSize, brushSize * 2]);
                break;
            case 'dashed':
                ctx.setLineDash([brushSize * 4, brushSize * 4]);
                break;
            case 'textured':
                ctx.setLineDash([brushSize, brushSize * 2]);
                ctx.lineJoin = "bevel";
                break;
            default: // solid
                ctx.setLineDash([]);
                break;
        }
    };

    const drawLine = (ctx, start, end) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    };

    const drawRectangle = (ctx, start, end) => {
        ctx.beginPath();
        ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
        ctx.stroke();
    };

    const drawCircle = (ctx, start, end) => {
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    };

    const getCursorPosition = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleUndo = () => {
        if (paths.length === 0) return;
        const newPaths = [...paths];
        const lastPath = newPaths.pop();
        setPaths(newPaths);
        setRedoStack([lastPath, ...redoStack]);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const newRedoStack = [...redoStack];
        const redoPath = newRedoStack.shift();
        setPaths([...paths, redoPath]);
        setRedoStack(newRedoStack);
    };

    const handleBrushTypeChange = (e) => {
        setBrushType(e.target.value);
    };

    return (
        <div>
            <div className="toolbar">
                <button onClick={handleUndo} disabled={paths.length === 0}>Undo</button>
                <button onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
                <select className='canvas_select' value={brushType} onChange={handleBrushTypeChange}>
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                    <option value="textured">Textured</option>
                </select>
            </div>
            <canvas
                ref={canvasRef}
                className="canvas"
                width={800}
                height={500}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
            />
        </div>
    );
}

export default Canvas;
