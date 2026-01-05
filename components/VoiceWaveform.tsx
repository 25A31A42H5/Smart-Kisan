
import React, { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  volume?: number; // 0 to 1
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isActive, volume = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isActive) {
        // Draw multiple layers for a richer effect
        const barCount = 40;
        const barWidth = canvas.width / barCount;
        const middle = canvas.height / 2;
        
        // Base sine wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < canvas.width; i++) {
          const y = middle + Math.sin(i * 0.05 + phase) * (10 + volume * 30);
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();

        // Responsive bars
        for (let i = 0; i < barCount; i++) {
          const height = (5 + volume * 60) * Math.abs(Math.sin(phase + i * 0.2));
          ctx.fillStyle = `rgba(34, 197, 94, ${0.4 + volume * 0.6})`;
          ctx.fillRect(i * barWidth + 2, middle - height / 2, barWidth - 4, height);
        }

        phase += 0.1 + volume * 0.2;
      } else {
        ctx.beginPath();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isActive, volume]);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={100} 
      className="w-full h-24 rounded-2xl"
    />
  );
};
