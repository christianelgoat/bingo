import React, { useMemo } from 'react';
import { Quadrant } from '../types';

// Simple seedable random number generator for consistency
const mulberry32 = (a: number) => {
  return () => {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

interface Point {
  x: number;
  y: number;
}

const generatePoints = (quadrant: Quadrant, count: number, maxRadius: number): Point[] => {
  const points: Point[] = [];
  let meanX = 0, meanY = 0, stdDev = 0;
  
  // Use a fixed seed for each quadrant for deterministic "randomness"
  let rand = mulberry32(1);

  switch (quadrant) {
    case Quadrant.HV_HP: // High Veracity, High Precision
      meanX = 0;
      meanY = 0;
      stdDev = maxRadius * 0.1;
      rand = mulberry32(100);
      break;
    case Quadrant.HV_LP: // High Veracity, Low Precision
      meanX = 0;
      meanY = 0;
      stdDev = maxRadius * 0.4;
      rand = mulberry32(200);
      break;
    case Quadrant.LV_HP: // Low Veracity, High Precision
      meanX = maxRadius * 0.6;
      meanY = maxRadius * 0.6;
      stdDev = maxRadius * 0.1;
      rand = mulberry32(300);
      break;
    case Quadrant.LV_LP: // Low Veracity, Low Precision
      meanX = maxRadius * 0.5;
      meanY = -maxRadius * 0.5;
      stdDev = maxRadius * 0.45;
      rand = mulberry32(400);
      break;
  }
  
  // Box-Muller transform to get a normal distribution
  for (let i = 0; i < count; i++) {
    const u1 = rand();
    const u2 = rand();
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    points.push({
      x: meanX + stdDev * z1,
      y: meanY + stdDev * z2,
    });
  }

  return points;
};

interface TargetDiagramProps {
  quadrant: Quadrant;
  width?: number;
  height?: number;
}

const TargetDiagram: React.FC<TargetDiagramProps> = ({ quadrant, width = 450, height = 450 }) => {
  const viewBoxSize = 500;
  const center = viewBoxSize / 2;
  const maxRadius = viewBoxSize / 2 - 20;
  
  const points = useMemo(() => generatePoints(quadrant, 25, maxRadius), [quadrant, maxRadius]);

  const rings = [
    { radius: maxRadius, color: 'fill-slate-200' },
    { radius: maxRadius * 0.8, color: 'fill-white' },
    { radius: maxRadius * 0.6, color: 'fill-sky-200' },
    { radius: maxRadius * 0.4, color: 'fill-white' },
    { radius: maxRadius * 0.2, color: 'fill-red-500' },
  ];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} aria-label="Diagrama de diana mostrando la dispersión de los disparos">
      <g transform={`translate(${center}, ${center})`}>
        {rings.map((ring, index) => (
          <circle key={index} cx="0" cy="0" r={ring.radius} className={`${ring.color} stroke-slate-300`} strokeWidth="1" />
        ))}
        
        {/* Crosshairs */}
        <line x1={-maxRadius} y1="0" x2={maxRadius} y2="0" className="stroke-slate-400" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1={-maxRadius} x2="0" y2={maxRadius} className="stroke-slate-400" strokeWidth="1" strokeDasharray="4 4" />

        {/* Shots */}
        {points.map((p, i) => (
          <circle 
            key={i} 
            cx={p.x} 
            cy={p.y} 
            r="6" 
            className="fill-slate-800 opacity-80"
          />
        ))}
        
        {/* MVP State Overlay for HV_LP */}
        {quadrant === Quadrant.HV_LP && (
          <g aria-labelledby="mvp-state-title">
            <title id="mvp-state-title">Estado Actual del MVP</title>
            <rect
              x={10}
              y={10}
              width={maxRadius * 0.95}
              height={maxRadius * 0.95}
              className="fill-red-200/50 stroke-red-500"
              strokeWidth="2"
              rx="8"
            />
            <text
              x={10 + (maxRadius * 0.95) / 2}
              y={10 + (maxRadius * 0.95) / 2}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-semibold fill-red-800 select-none"
              fontSize="22"
            >
              <tspan x={10 + (maxRadius * 0.95) / 2} dy="-0.6em">Estado Actual</tspan>
              <tspan x={10 + (maxRadius * 0.95) / 2} dy="1.2em">del MVP</tspan>
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};

export default TargetDiagram;