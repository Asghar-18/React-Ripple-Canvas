"use client"
import React, { useEffect, useRef } from 'react';
import dat from 'dat.gui';

interface Coords {
  x: number | null;
  y: number | null;
}

interface RippleSettings {
  maxSize: number;
  animationSpeed: number;
  strokeColor: [number, number, number];
}

interface CanvasSettings {
  blur: number;
  ratio: number;
}

class Ripple {
  position: Coords;
  circleSize: number;
  maxSize: number;
  opacity: number;
  ctx: CanvasRenderingContext2D;
  strokeColor: string;
  animationSpeed: number;
  opacityStep: number;

  constructor(x: number, y: number, circleSize: number, ctx: CanvasRenderingContext2D, settings: RippleSettings) {
    this.position = { x, y };
    this.circleSize = circleSize;
    this.maxSize = settings.maxSize;
    this.opacity = 1;
    this.ctx = ctx;
    this.strokeColor = `rgba(${Math.floor(settings.strokeColor[0])},
      ${Math.floor(settings.strokeColor[1])},
      ${Math.floor(settings.strokeColor[2])},
      ${this.opacity})`;
    this.animationSpeed = settings.animationSpeed;
    this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
  }

  update() {
    this.circleSize += this.animationSpeed;
    this.opacity -= this.opacityStep;
    this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.arc(this.position.x!, this.position.y!, this.circleSize, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

const rippleSettings: RippleSettings = {
  maxSize: 100,
  animationSpeed: 5,
  strokeColor: [148, 217, 255],
};

const canvasSettings: CanvasSettings = {
  blur: 8,
  ratio: 1,
};

const RippleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const ripples = ripplesRef.current;
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;

    canvas.style.filter = `blur(${canvasSettings.blur}px)`;
    canvas.width = width * canvasSettings.ratio;
    canvas.height = height * canvasSettings.ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Add GUI settings
    const addGuiSettings = () => {
      const gui = new dat.GUI();
      gui.add(rippleSettings, 'maxSize', 0, 1000).step(1);
      gui.add(rippleSettings, 'animationSpeed', 1, 30).step(1);
      gui.addColor(rippleSettings, 'strokeColor');

      const blur = gui.add(canvasSettings, 'blur', 0, 20).step(1);
      blur.onChange((value: number) => {
        canvas.style.filter = `blur(${value}px)`;
      });
    };

    addGuiSettings();

    // Function which is executed on mouse hover on canvas
    const canvasMouseOver = (e: MouseEvent) => {
      const x = e.clientX * canvasSettings.ratio;
      const y = e.clientY * canvasSettings.ratio;
      ripples.unshift(new Ripple(x, y, 2, ctx, rippleSettings));
    };

    const animation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const r = ripples[i];

        r.update();
        r.draw();

        if (r.opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(animation);
    };

    animation();
    canvas.addEventListener('mousemove', canvasMouseOver);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', canvasMouseOver);
    };
  }, []);

  return (
    <div id="wrapper">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default RippleCanvas;
