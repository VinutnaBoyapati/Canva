import React, { useState } from 'react';
import CanvasForm from './components/CanvasForm';
import AddElementForm from './components/AddElementForm';
import CanvasPreview from './components/CanvasPreview';
import ExportButton from './components/ExportButton';

function App() {
  const [canvasId, setCanvasId] = useState('');
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [elements, setElements] = useState([]);

  return (
    <div>
      <h1>🎨Canvas Builder</h1>
      <CanvasForm
        setCanvasId={setCanvasId}
        setCanvasWidth={setCanvasWidth}
        setCanvasHeight={setCanvasHeight}
      />

      {canvasId && (
        <>
          <AddElementForm
            canvasId={canvasId}
            elements={elements}
            setElements={setElements}
            canvasWidth={canvasWidth}    
            canvasHeight={canvasHeight}
          />
          <CanvasPreview
            width={canvasWidth}
            height={canvasHeight}
            elements={elements}
          />
          <ExportButton canvasId={canvasId} />
        </>
      )}
    </div>
  );
}

export default App;
