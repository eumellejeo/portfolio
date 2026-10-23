'use client';

import { useEffect, useRef } from 'react';

interface IcosahedronProps {
  className?: string;
  size?: number;
  /** Radians advanced per frame (~60fps). Positive = surface moves left → right. */
  speed?: number;
  /** Constant forward tilt (radians) so the top cap is slightly visible, like the reference. */
  tilt?: number;
}

type Vec3 = [number, number, number];

/**
 * Builds a vertex-up icosahedron (one vertex at the top, one at the bottom,
 * two staggered pentagonal rings in between). Screen-space convention: +y is down.
 */
function buildIcosahedron(): { vertices: Vec3[]; faces: [number, number, number][] } {
  const ringY = 1 / Math.sqrt(5);
  const ringR = 2 / Math.sqrt(5);

  const vertices: Vec3[] = [];
  vertices.push([0, -1, 0]); // 0: top
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5;
    vertices.push([ringR * Math.sin(a), -ringY, ringR * Math.cos(a)]); // 1..5: upper ring
  }
  for (let i = 0; i < 5; i++) {
    const a = ((i + 0.5) * 2 * Math.PI) / 5;
    vertices.push([ringR * Math.sin(a), ringY, ringR * Math.cos(a)]); // 6..10: lower ring
  }
  vertices.push([0, 1, 0]); // 11: bottom

  const faces: [number, number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const u0 = 1 + i;
    const u1 = 1 + ((i + 1) % 5);
    const l0 = 6 + i;
    const l1 = 6 + ((i + 1) % 5);
    faces.push([0, u0, u1]); // top cap
    faces.push([u0, l0, u1]); // upper band
    faces.push([u1, l0, l1]); // lower band
    faces.push([11, l1, l0]); // bottom cap
  }
  return { vertices, faces };
}

export function Icosahedron({
  className = '',
  size = 260,
  speed = 0.008,
  tilt = 0.2,
}: IcosahedronProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { vertices, faces } = buildIcosahedron();

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    // Start slightly rotated so an edge (not a flat face) faces the viewer.
    let spin = Math.PI / 5;

    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    // Light from top-left, towards the viewer (camera looks along +z).
    const lLen = Math.hypot(-0.35, -0.55, -0.75);
    const light: Vec3 = [-0.35 / lLen, -0.55 / lLen, -0.75 / lLen];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);

      // 1) Spin around the vertical axis (left → right for the front surface)
      // 2) Apply a constant forward tilt so the top cap leans toward the viewer
      const rotated: Vec3[] = vertices.map(([x, y, z]) => {
        const x1 = x * cosS - z * sinS;
        const z1 = x * sinS + z * cosS;
        const y2 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;
        return [x1, y2, z2];
      });

      const cameraZ = 4;
      const radius = size * 0.4;
      const projected = rotated.map(([x, y, z]) => {
        const p = cameraZ / (cameraZ + z);
        return [size / 2 + x * radius * p, size / 2 + y * radius * p] as [number, number];
      });

      const isDark = document.documentElement.classList.contains('dark');
      const strokeColor = isDark ? '#F5F4F0' : '#1C1917';
      const base = isDark ? [28, 27, 25] : [245, 244, 240];

      // Painter's algorithm: draw every face back → front with an opaque fill,
      // so hidden edges are naturally covered (clean line-art look).
      const ordered = faces
        .map((f) => {
          const [a, b, c] = f.map((i) => rotated[i]) as [Vec3, Vec3, Vec3];
          const cx = (a[0] + b[0] + c[0]) / 3;
          const cy = (a[1] + b[1] + c[1]) / 3;
          const cz = (a[2] + b[2] + c[2]) / 3;
          // Outward normal of a convex solid centred at the origin = centroid direction
          const len = Math.hypot(cx, cy, cz) || 1;
          const dot = Math.max(0, (cx * light[0] + cy * light[1] + cz * light[2]) / len);
          return { f, z: cz, dot };
        })
        .sort((p, q) => q.z - p.z);

      ctx.lineWidth = Math.max(2, size / 95);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = strokeColor;

      for (const { f, dot } of ordered) {
        const [p1, p2, p3] = f.map((i) => projected[i]);
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.lineTo(p3[0], p3[1]);
        ctx.closePath();

        const shade = Math.round((dot - 0.5) * 14);
        const [r, g, b] = base.map((v) => Math.min(255, Math.max(0, v + shade)));
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
        ctx.stroke();
      }
    };

    const render = () => {
      spin += speed;
      draw();
      animId = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      draw();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => cancelAnimationFrame(animId);
  }, [size, speed, tilt]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`select-none ${className}`}
      aria-label="Spinning wireframe icosahedron"
      role="img"
    />
  );
}
