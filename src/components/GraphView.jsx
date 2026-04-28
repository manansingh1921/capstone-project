import { useEffect, useRef } from "react";

export default function GraphView({ tasks = [] }) {
  const canvasRef = useRef(null);

  const nodes = tasks.slice(-12);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const points = nodes.map((_, i) => ({
        x: ((i % 4) * 0.25 + 0.15) * w,
        y: (Math.floor(i / 4) * 0.35 + 0.2) * h
      }));

      // LINKS
      ctx.strokeStyle = "rgba(99,102,241,0.3)";
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
      }

      // NODES
      points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);

        ctx.fillStyle = nodes[i]?.completed ? "#a78bfa" : "#4f46e5";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#6366f1";

        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }, [nodes]);

  return (
    <div className="graph-card">
      <h3 style={{ fontSize: "10px", marginBottom: "10px" }}>
        TASK NETWORK
      </h3>

      <canvas
        ref={canvasRef}
        width={300}
        height={180}
        className="graph-canvas"
      />
    </div>
  );
}
