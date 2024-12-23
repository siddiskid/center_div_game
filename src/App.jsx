import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [curr_pos, set_curr_pos] = useState(0);
  const [dx, set_dx] = useState(10); // Initial direction is positive (moving right)

  useEffect(() => {
    const interval = setInterval(() => {
      set_curr_pos((prev_pos) => {
        const next_pos = prev_pos + dx;

        // Check boundaries
        if (next_pos >= window.innerWidth - 50) {
          set_dx(-Math.abs(dx)); // Reverse direction to left
          return window.innerWidth - 50; // Stay at the right edge
        }

        if (next_pos <= 0) {
          set_dx(Math.abs(dx)); // Reverse direction to right
          return 0; // Stay at the left edge
        }

        return next_pos;
      });
    }, 16.67); // ~60 frames per second

    return () => clearInterval(interval);
  }, [dx]); // Re-run effect if `dx` changes

  const handleSpaceKey = (event) => {
    if (event.code === 'Space') {
      set_dx(0); // Pause movement
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
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${curr_pos}px`,
        }}
        className="block"
      ></div>
      <div style={{ position: 'absolute', top: '5%', left: '10%' }}>Score</div>
      <div style={{ position: 'absolute', top: '5%', left: '20%' }}>Coins</div>
      <div style={{ position: 'absolute', top: '5%', left: '30%' }}>Highscore</div>
      <button
        style={{ position: 'absolute', top: '5%', left: '80%' }}
        onClick={() => {
          set_curr_pos(0); // Reset position
          set_dx(10); // Reset to moving right
        }}
      >
        Restart
      </button>
      <button
        style={{ position: 'absolute', top: '5%', left: '90%' }}
        onClick={() => set_dx(0)} // Pause movement
      >
        Pause
      </button>
    </>
  );
}

export default App;
