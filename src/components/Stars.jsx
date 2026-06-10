import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const drift = keyframes`
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: var(--max-op); }
  90%  { opacity: var(--max-op); }
  100% { transform: translateY(-70px) translateX(var(--dx)); opacity: 0; }
`;

const StarsCanvas = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const Star = styled.span`
  position: absolute;
  border-radius: 50%;
  background: white;
  width: var(--size);
  height: var(--size);
  left: var(--x);
  top: var(--y);
  animation: ${drift} var(--duration) linear infinite var(--delay);
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: var(--max-op);
  }
`;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Stars({ count = 100 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    size:     randomBetween(1, 2.2),
    x:        randomBetween(0, 100),
    y:        randomBetween(0, 100),
    duration: randomBetween(5, 12),
    delay:   -randomBetween(0, 12),
    maxOp:    randomBetween(0.25, 0.75),
    dx:       randomBetween(-15, 15),
  }));

  return (
    <StarsCanvas aria-hidden="true">
      {stars.map(s => (
        <Star
          key={s.id}
          style={{
            '--size':     `${s.size}px`,
            '--x':        `${s.x}%`,
            '--y':        `${s.y}%`,
            '--duration': `${s.duration}s`,
            '--delay':    `${s.delay}s`,
            '--max-op':   s.maxOp,
            '--dx':       `${s.dx}px`,
          }}
        />
      ))}
    </StarsCanvas>
  );
}
