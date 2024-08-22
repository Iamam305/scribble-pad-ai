import { useEffect } from "react";

interface NoiseOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Noise {
  private phase: number;
  private offset: number;
  private frequency: number;
  private amplitude: number;
  private value: number = 0;

  constructor(options: NoiseOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }

  getValue(): number {
    return this.value;
  }
}

interface LineOptions {
  spring: number;
}

class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class Line {
  private spring: number;
  private friction: number;
  nodes: Node[];

  constructor(options: LineOptions) {
    this.spring = options.spring + 0.1 * Math.random() - 0.02;
    this.friction = E.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let spring = this.spring;
    const firstNode = this.nodes[0];
    firstNode.vx += (pos.x - firstNode.x) * spring;
    firstNode.vy += (pos.y - firstNode.y) * spring;

    for (let i = 1; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const prevNode = this.nodes[i - 1];
      node.vx += (prevNode.x - node.x) * spring;
      node.vy += (prevNode.y - node.y) * spring;
      node.vx += prevNode.vx * E.dampening;
      node.vy += prevNode.vy * E.dampening;
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  }

  draw(): void {
    let [x, y] = [this.nodes[0].x, this.nodes[0].y];
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const node = this.nodes[i];
      const nextNode = this.nodes[i + 1];
      x = (node.x + nextNode.x) * 0.5;
      y = (node.y + nextNode.y) * 0.5;
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }

    const secondLastNode = this.nodes[this.nodes.length - 2];
    const lastNode = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(secondLastNode.x, secondLastNode.y, lastNode.x, lastNode.y);
    ctx.stroke();
    ctx.closePath();
  }
}

interface Position {
  x: number;
  y: number;
}

const pos: Position = { x: 0, y: 0 };
let lines: Line[] = [];

const E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

let ctx: CanvasRenderingContext2D;
let f: Noise;

function onMousemove(e: MouseEvent | TouchEvent): void {
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", handleMouseOrTouch);
  document.addEventListener("touchmove", handleMouseOrTouch);
  document.addEventListener("touchstart", handleTouchStart);
  handleMouseOrTouch(e);
  initLines();
  render();
}

function handleMouseOrTouch(e: MouseEvent | TouchEvent): void {
  if ("touches" in e) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
  e.preventDefault();
}

function handleTouchStart(e: TouchEvent): void {
  if (e.touches.length === 1) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  }
}

function initLines(): void {
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
  }
}

function render(): void {
  if (ctx.canvas && ctx instanceof CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `hsla(${Math.round(f.update())},50%,50%,0.2)`;
    ctx.lineWidth = 1;

    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw();
    }

    (ctx as any).frame++;
    if ((ctx as any).running) {
      window.requestAnimationFrame(render);
    }
  }
}

function resizeCanvas(): void {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }
}

const useCanvasCursor = (): void => {
  const renderCanvas = (): void => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      (ctx as any).running = true;
      (ctx as any).frame = 1;

      f = new Noise({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("touchstart", onMousemove);
      document.body.addEventListener("orientationchange", resizeCanvas);
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("focus", () => {
        if (!(ctx as any).running) {
          (ctx as any).running = true;
          render();
        }
      });
      window.addEventListener("blur", () => {
        (ctx as any).running = false;
      });
      resizeCanvas();
    }
  };

  useEffect(() => {
    renderCanvas();

    return () => {
      if (ctx) {
        (ctx as any).running = false;
      }
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("touchstart", onMousemove);
      document.body.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", () => {
        if (ctx && !(ctx as any).running) {
          (ctx as any).running = true;
          render();
        }
      });
      window.removeEventListener("blur", () => {
        if (ctx) {
          (ctx as any).running = false;
        }
      });
    };
  }, []);
};

export default useCanvasCursor;