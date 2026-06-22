import React, { useRef, useEffect, useState } from 'react';
import { portfolioData } from '../data';

interface Node3D {
  name: string;
  category: string;
  level: number;
  // Initial 3D coordinates
  ox: number;
  oy: number;
  oz: number;
  // Rotated 3D coordinates
  x: number;
  y: number;
  z: number;
  // Projected 2D screen coordinates
  px: number;
  py: number;
  scale: number;
}

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction angles
  const angleX = useRef<number>(0.003); // slow auto rotation
  const angleY = useRef<number>(0.004);
  const isDragging = useRef<boolean>(false);
  const lastMouseX = useRef<number>(0);
  const lastMouseY = useRef<number>(0);
  const velocityX = useRef<number>(0);
  const velocityY = useRef<number>(0);

  // Node datasets
  const nodes = useRef<Node3D[]>([]);
  const [hoveredNode, setHoveredNode] = useState<Node3D | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Initialize nodes from portfolio data
  useEffect(() => {
    const rawNodes: Node3D[] = [];
    portfolioData.skills.forEach((group) => {
      group.skills.forEach((skill) => {
        rawNodes.push({
          name: skill.name,
          category: group.category,
          level: skill.level,
          ox: skill.x,
          oy: skill.y,
          oz: skill.z,
          x: skill.x,
          y: skill.y,
          z: skill.z,
          px: 0,
          py: 0,
          scale: 1,
        });
      });
    });
    nodes.current = rawNodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Apply decelerating inertia inertia
      if (!isDragging.current) {
        angleX.current += (0.001 - angleX.current) * 0.05;
        angleY.current += (0.001 - angleY.current) * 0.05;
        // Float values
        velocityX.current *= 0.95;
        velocityY.current *= 0.95;
        angleX.current += velocityY.current * 0.002;
        angleY.current += velocityX.current * 0.002;
      } else {
        angleX.current = velocityY.current * 0.005;
        angleY.current = velocityX.current * 0.005;
      }

      // Sine/Cosine for 3D rotations
      const cosX = Math.cos(angleX.current);
      const sinX = Math.sin(angleX.current);
      const cosY = Math.cos(angleY.current);
      const sinY = Math.sin(angleY.current);

      // Perform 3D rotation on nodes
      nodes.current.forEach((node) => {
        // Rotate Y axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X axis
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y2;
        node.z = z2;

        // Perspective projection
        const focalLength = 280;
        node.scale = focalLength / (focalLength + node.z);
        node.px = width / 2 + node.x * node.scale;
        node.py = height / 2 + node.y * node.scale;
      });

      // Group draw connectors: link nodes in similar categories or with central hubs
      ctx.lineWidth = 0.8;
      nodes.current.forEach((nodeA, index) => {
        nodes.current.slice(index + 1).forEach((nodeB) => {
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dz = nodeA.z - nodeB.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // We draw a glowing thread if they are in the same category and close enough, or across categories
          const maxDist = nodeA.category === nodeB.category ? 130 : 90;
          if (dist < maxDist) {
            const alpha = ((maxDist - dist) / maxDist) * 0.4 * nodeA.scale * nodeB.scale;
            ctx.beginPath();
            ctx.moveTo(nodeA.px, nodeA.py);
            ctx.lineTo(nodeB.px, nodeB.py);
            // Color based on category similarity
            if (nodeA.category === nodeB.category) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`; // sky-400 cyan
            } else {
              ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`; // indigo-400
            }
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.current.forEach((node) => {
        const size = (hoveredNode?.name === node.name ? 10 : 6) * node.scale;
        if (size <= 0.5) return;

        // Depth fog / alpha
        const alpha = Math.min(1.0, Math.max(0.12, (node.z + 150) / 300));

        // Node glow radial
        const grad = ctx.createRadialGradient(node.px, node.py, size * 0.1, node.px, node.py, size);
        if (hoveredNode?.name === node.name) {
          grad.addColorStop(0, '#f43f5e'); // rose node
          grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
        } else {
          // Palette coloring based on domain categories
          let color = 'rgba(56, 189, 248,'; // sky
          if (node.category.includes('Database') || node.category.includes('DBMS')) color = 'rgba(232, 121, 249,'; // fuchsia
          if (node.category.includes('AI')) color = 'rgba(168, 85, 247,'; // purple
          if (node.category.includes('Tools') || node.category.includes('BI')) color = 'rgba(14, 165, 233,'; // light-blue

          grad.addColorStop(0, `${color} ${alpha})`);
          grad.addColorStop(1, `${color} 0)`);
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.px, node.py, size, 0, Math.PI * 2);
        ctx.fill();

        // Label typography
        if (node.scale > 0.65) {
          ctx.font = `${node.scale * 10 + 2}px var(--font-mono, monospace)`;
          ctx.fillStyle = hoveredNode?.name === node.name
            ? 'rgba(244, 63, 94, 0.95)'
            : `rgba(226, 232, 240, ${Math.min(0.9, alpha * 0.9)})`; // slate-200
          ctx.textAlign = 'center';
          ctx.fillText(node.name, node.px, node.py - size - 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [hoveredNode]);

  // Touch and mouse handlers for 3D rotation dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDragging.current) {
      velocityX.current = e.clientX - lastMouseX.current;
      velocityY.current = e.clientY - lastMouseY.current;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
    } else {
      // Hover detection
      let found: Node3D | null = null;
      for (const node of nodes.current) {
        const dx = node.px - mx;
        const dy = node.py - my;
        const dist2D = Math.sqrt(dx * dx + dy * dy);
        if (dist2D < 12 * node.scale) {
          found = node;
          setTooltipPos({ x: mx, y: my });
          break;
        }
      }
      setHoveredNode(found);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      velocityX.current = e.touches[0].clientX - lastMouseX.current;
      velocityY.current = e.touches[0].clientY - lastMouseY.current;
      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    }
  };

  return (
    <div id="skills-canvas-container" ref={containerRef} className="relative w-full h-[330px] md:h-[450px] bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing backdrop-blur-md">
      <div className="absolute top-4 left-5 z-10 pointer-events-none">
        <h3 className="text-sm font-semibold tracking-wider text-slate-300 font-sans uppercase">Skill Nodes Network</h3>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">Drag to rotate in 3D Space &bull; Hover for details</p>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="block"
      />

      {/* Floating 3D Node details HUD */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 10}px`,
          }}
          className="pointer-events-none z-30 bg-slate-900/95 border border-slate-700/80 text-white rounded-lg p-3 shadow-2xl backdrop-blur-xl w-[205px]"
        >
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-sky-400">{hoveredNode.name}</span>
            <span className="text-[9px] px-1.5 py-0.5 bg-slate-800/80 rounded border border-slate-700 text-slate-400 capitalize">
              {hoveredNode.category.split(' & ')[0]}
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-300 font-mono">
            <div className="flex justify-between items-center">
              <span>Proficiency:</span>
              <span className="text-right text-rose-400 font-bold">{hoveredNode.level}%</span>
            </div>
            {/* Minimal scale representation bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                style={{ width: `${hoveredNode.level}%` }}
                className="h-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-rose-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Legend in corner */}
      <div className="absolute bottom-4 right-5 z-10 flex flex-wrap gap-x-4 gap-y-1 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/50 text-[10px] text-slate-400 font-mono scale-90 origin-bottom-right">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>Programming</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
          <span>Data Science</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span>AI & Agentic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>BI Tools</span>
        </div>
      </div>
    </div>
  );
}
