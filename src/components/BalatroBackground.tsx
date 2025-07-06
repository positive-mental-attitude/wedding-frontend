import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Vec2 } from 'ogl';

interface BalatroBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  pixelFilter?: number;
  isRotate?: boolean;
  mouseInteraction?: boolean;
}

const BalatroBackground: React.FC<BalatroBackgroundProps> = ({
  color1 = '#FF8936',
  color2 = '#1F2347',
  color3 = '#251E3E',
  pixelFilter = 900,
  isRotate = false,
  mouseInteraction = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef(new Vec2());

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer({ canvas, alpha: true });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();

    // Convert hex colors to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 1, g: 1, b: 1 };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const rgb3 = hexToRgb(color3);

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float pixelFilter;
      varying vec2 vUv;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        vec2 pixelatedUv = floor(uv * pixelFilter) / pixelFilter;
        
        float t = time * 0.1;
        vec2 mouseInfluence = mouse * 0.1;
        
        float pattern1 = fbm(pixelatedUv * 3.0 + t + mouseInfluence);
        float pattern2 = fbm(pixelatedUv * 5.0 - t * 0.7 + mouseInfluence * 0.5);
        float pattern3 = fbm(pixelatedUv * 2.0 + t * 1.3 + mouseInfluence * 0.3);
        
        vec3 finalColor = mix(color1, color2, pattern1);
        finalColor = mix(finalColor, color3, pattern2 * 0.7);
        finalColor += color1 * pattern3 * 0.3;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new Plane(gl, { width: 2, height: 2 });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        mouse: { value: mouseRef.current },
        color1: { value: [rgb1.r, rgb1.g, rgb1.b] },
        color2: { value: [rgb2.r, rgb2.g, rgb2.b] },
        color3: { value: [rgb3.r, rgb3.g, rgb3.b] },
        pixelFilter: { value: pixelFilter },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      program.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInteraction) {
        mouseRef.current.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        );
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const animate = (time: number) => {
      program.uniforms.time.value = time * 0.001;
      
      if (isRotate) {
        mesh.rotation.z = time * 0.0001;
      }

      renderer.render({ scene, camera });
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color1, color2, color3, pixelFilter, isRotate, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default BalatroBackground;