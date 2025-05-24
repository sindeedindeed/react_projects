import React, { useEffect, useState } from 'react'
import Todo from './components/Todo'

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 grid py-4 min-h-screen relative overflow-hidden'>
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        style={{
          left: mousePosition.x / 5,
          top: mousePosition.y / 5,
          transition: 'left 3s ease-out, top 3s ease-out',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"
        style={{
          right: mousePosition.x / 6,
          bottom: mousePosition.y / 6,
          transition: 'right 3.5s ease-out, bottom 3.5s ease-out',
        }}
      />
      <Todo />
    </div>
  )
}

export default App
