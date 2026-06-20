import { useEffect, useRef } from 'react';

const TAIL_LENGTH = 20;

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, isActive: false });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Arrays of points for the two tails
    const warmPoints = Array.from({ length: TAIL_LENGTH }, () => ({ x: width / 2, y: height / 2 }));
    const coolPoints = Array.from({ length: TAIL_LENGTH }, () => ({ x: width / 2, y: height / 2 }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!mouse.current.isActive) {
        mouse.current.isActive = true;
        // On first mouse move, instantly teleport all trailing points to the cursor
        warmPoints.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
        coolPoints.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      if (!mouse.current.isActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Physics update: point 0 follows mouse
      warmPoints[0].x += (mouse.current.x - warmPoints[0].x) * 0.55;
      warmPoints[0].y += (mouse.current.y - warmPoints[0].y) * 0.55;

      coolPoints[0].x += (mouse.current.x - coolPoints[0].x) * 0.25;
      coolPoints[0].y += (mouse.current.y - coolPoints[0].y) * 0.25;

      // Others follow the previous point in the array
      for (let i = 1; i < TAIL_LENGTH; i++) {
        warmPoints[i].x += (warmPoints[i - 1].x - warmPoints[i].x) * 0.55;
        warmPoints[i].y += (warmPoints[i - 1].y - warmPoints[i].y) * 0.55;

        coolPoints[i].x += (coolPoints[i - 1].x - coolPoints[i].x) * 0.25;
        coolPoints[i].y += (coolPoints[i - 1].y - coolPoints[i].y) * 0.25;
      }

      // Draw the cool trailing shadow (cyan)
      for (let i = 0; i < TAIL_LENGTH - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(coolPoints[i].x, coolPoints[i].y);
        ctx.lineTo(coolPoints[i+1].x, coolPoints[i+1].y);
        ctx.lineWidth = 14 * (1 - i / TAIL_LENGTH);
        const opacity = 0.3 * (1 - i / TAIL_LENGTH);
        ctx.strokeStyle = `rgba(61, 209, 229, ${opacity})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw the warm primary tail (amber)
      for (let i = 0; i < TAIL_LENGTH - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(warmPoints[i].x, warmPoints[i].y);
        ctx.lineTo(warmPoints[i+1].x, warmPoints[i+1].y);
        ctx.lineWidth = 6 * (1 - i / TAIL_LENGTH);
        const opacity = 0.8 * (1 - i / TAIL_LENGTH);
        ctx.strokeStyle = `rgba(229, 169, 61, ${opacity})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw sharp main dot at the tip
      ctx.beginPath();
      ctx.arc(warmPoints[0].x, warmPoints[0].y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f8f8f8';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block" // Disable on mobile/touch devices
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen', // Adds a nice glowing effect over dark backgrounds
      }}
    />
  );
}
