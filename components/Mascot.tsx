import React from 'react';

const Mascot: React.FC = () => {
  return (
    <div className="relative w-48 h-48 sm:w-60 sm:h-60 animate-bobble mx-auto">
      <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain drop-shadow-xl">
        <defs>
          <radialGradient id="gradCloud" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor: 'rgb(255,255,255)', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'rgb(220, 230, 240)', stopOpacity: 1}} />
          </radialGradient>
        </defs>
        <g>
          {/* Main cloud body with bumps */}
          <path d="M 60,115 A 40,40 0 0 1 60,35 A 50,50 0 0 1 150,55 A 30,30 0 0 1 150,115 Z" fill="url(#gradCloud)" />
          <circle cx="60" cy="75" r="40" fill="url(#gradCloud)" />
          <circle cx="100" cy="55" r="50" fill="url(#gradCloud)" />
          <circle cx="140" cy="75" r="30" fill="url(#gradCloud)" />
        </g>
        {/* Face */}
        <circle cx="85" cy="80" r="6" fill="#1e293b" />
        <circle cx="115" cy="80" r="6" fill="#1e293b" />
        <path d="M 95,95 Q 100,105 105,95" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Rosy Cheeks */}
        <circle cx="75" cy="90" r="8" fill="#fecaca" opacity="0.8" />
        <circle cx="125" cy="90" r="8" fill="#fecaca" opacity="0.8" />
      </svg>
    </div>
  );
};

export default Mascot;
