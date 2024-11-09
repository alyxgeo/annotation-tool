import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

function Canvas({ imageSrc }) {
  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
    });
    setCanvasInstance(canvas);

    return () => {
      canvas.dispose();
    };
  }, [imageSrc]);


  useEffect(() => {
    if (imageSrc && canvasInstance) {
      fabric.Image.fromURL(imageSrc, (img) => {
        img.set({
          left: 0,
          top: 0,
          scaleX: canvasInstance.width / img.width,
          scaleY: canvasInstance.height / img.height,
        });
        canvasInstance.setBackgroundImage(img, canvasInstance.renderAll.bind(canvasInstance));
      });
    }
  }, [imageSrc, canvasInstance]);


  const addText = () => {
    const text = new fabric.Textbox('New Text', {
      left: 50,
      top: 50,
      fontSize: 20,
    });
    canvasInstance.add(text);
  };


  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 100,
      fill: 'transparent',
      stroke: 'red',
      strokeWidth: 2,
      width: 100,
      height: 100,
    });
    canvasInstance.add(rect);
  };


  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 200,
      radius: 50,
      fill: 'transparent',
      stroke: 'blue',
      strokeWidth: 2,
    });
    canvasInstance.add(circle);
  };


  const deleteSelected = () => {
    const activeObject = canvasInstance.getActiveObject();
    if (activeObject) {
      canvasInstance.remove(activeObject);
    }
  };


  return (
    <div>
      <div className='btn-container'>
        <button className='button-65' onClick={addText}>Add Text</button>
        <button className='button-65' onClick={addRectangle}>Rectangle</button>
        <button className='button-65' onClick={addCircle}>Circle</button>
        <button className='button-delete' onClick={deleteSelected}>Delete</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
