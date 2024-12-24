import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([{ id: 0, left: 0, top: window.innerHeight / 2 }]);
  const [dx, setDx] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block, index) => {
          if (index === prevBlocks.length - 1) {
            // Only move the top block
            const nextLeft = block.left + dx;

            if (nextLeft >= window.innerWidth - 100) {
              setDx(-Math.abs(dx));
              return { ...block, left: window.innerWidth - 100 };
            }

            if (nextLeft <= 0) {
              setDx(Math.abs(dx));
              return { ...block, left: 0 };
            }

            return { ...block, left: nextLeft };
          }
          return block;
        })
      );
    }, 16.67);

    return () => clearInterval(interval);
  }, [dx]);

  const handleSpaceKey = (event) => {
    if (event.code === 'Space') {
      setBlocks((prevBlocks) => {
        const newTop = prevBlocks[prevBlocks.length - 1].top - 25; // Spawn new block above
        const updatedBlocks = prevBlocks.map((block, index) =>
          index === prevBlocks.length - 1
            ? { ...block, top: block.top + 25 } // Push the previous block down
            : block
        );
        return [
          ...updatedBlocks,
          { id: prevBlocks.length, left: 0, top: newTop }, // New block starts from the left
        ];
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleSpaceKey);

    return () => {
      document.removeEventListener('keyup', handleSpaceKey);
    };
  }, []);

  return (
    <>
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            position: 'absolute',
            width: '100px', // Block width
            height: '25px', // Block height
            backgroundColor: 'blue',
            top: `${block.top}px`,
            left: `${block.left}px`,
          }}
          className="block"
        ></div>
      ))}
      <div style={{ position: 'absolute', top: '5%', left: '10%' }}>Coins</div>
      <div style={{ position: 'absolute', top: '12%', left: '10%' }}>Diamonds</div>
      <div style={{ position: 'absolute', top: '12%', left: '90%' }}>Score</div>
      <div style={{ position: 'absolute', top: '5%', left: '90%' }}>Highscore</div>
      <button
        style={{ position: 'absolute', top: '5%', left: '49%' }}
        onClick={() => setDx(0)} 
      >
        Pause
      </button>
    </>
  );
}

export default App;
