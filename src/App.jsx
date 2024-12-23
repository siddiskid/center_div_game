import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [curr_pos, set_curr_pos] = useState(0);
  const [dx, set_dx] = useState(10);

  useEffect(() => {
  const interval = setInterval(() => {
    if (curr_pos >= 1420) {
      set_curr_pos((curr_pos) => 0);
    }
    console.log(curr_pos >= (window.innerWidth - 50))
    if (curr_pos == 0) {
      set_dx(10);
    }
    set_curr_pos((curr_pos) => curr_pos + dx)
    // console.log(dx);
  }, 16.67);

  return () => clearInterval(interval);
}, []);

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    set_dx(0);
  }
})

  return (
    <>
    <div style={{position: 'absolute', top:"50%", left: curr_pos}} className='block'></div>
    <div style={{position: 'absolute', top:"5%", left: "10%"}}>Score</div>
    <div style={{position: 'absolute', top:"5%", left: "20%"}}>Coins</div>
    <div style={{position: 'absolute', top:"5%", left: "30%"}}>Highscore</div>
    <button style={{position: 'absolute', top:"5%", left:"80%" }} >Restart</button>
    <button style={{position: 'absolute', top:"5%", left:"90%" }} >Pause</button>
    </>
  )
}

export default App
