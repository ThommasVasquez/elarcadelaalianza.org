'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Check if mouse device
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      return;
    }

    const xTo = gsap.quickTo(follower, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.25, ease: 'power3' });

    const dotXTo = gsap.quickTo(cursor, 'x', { duration: 0.05, ease: 'power1' });
    const dotYTo = gsap.quickTo(cursor, 'y', { duration: 0.05, ease: 'power1' });

    const handleMouseMove = (e) => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .interactive-card, .service-row');
      if (target) {
        setIsHovered(true);
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'view') {
          setCursorText('↗');
        } else if (cursorType === 'drag') {
          setCursorText('↔');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full w-2 h-2 bg-[#FFD152] transition-opacity duration-150 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={followerRef}
        className={`fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-200 ${
          isHovered
            ? 'w-14 h-14 bg-[#FFD152] text-black shadow-lg shadow-[#FFD152]/30 scale-100'
            : isClicking
            ? 'w-6 h-6 border-2 border-[#FFD152] scale-75'
            : 'w-8 h-8 border border-white/30 scale-100'
        }`}
        style={{ left: 0, top: 0 }}
      >
        {cursorText && <span className="text-sm font-black">{cursorText}</span>}
      </div>
    </>
  );
}
