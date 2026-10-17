import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/**
 * Volumetric haze + drifting light shafts. Additive (screen) only, so if WebGL
 * is unavailable the composition simply falls back to the CSS wash underneath.
 */
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uIntensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;

  float t = uTime * 0.035;

  // Slow volumetric smoke drifting up through the frame.
  float smoke = fbm(p * 1.6 + vec2(t * 0.6, -t));
  smoke = pow(smoothstep(0.28, 0.95, smoke), 1.6);

  // A soft key light from upper left — matches the figure's lighting.
  vec2 lightDir = normalize(vec2(-0.55, 0.85));
  float key = clamp(dot(normalize(p + vec2(0.0, 0.12)), lightDir), 0.0, 1.0);
  float shaft = pow(key, 3.0) * (0.35 + 0.65 * smoke);

  // Centre bloom behind the mark so it reads as a light source.
  float bloom = exp(-6.0 * length(p * vec2(1.0, 1.5)));

  float fog = (smoke * 0.55 + shaft * 0.45) * uIntensity;
  float halo = bloom * 0.22 * uIntensity;

  // Vertical falloff: haze gathers low and behind the mark, never over the type.
  float falloff = smoothstep(0.02, 0.55, uv.y) * smoothstep(1.02, 0.52, uv.y);
  fog *= falloff;

  vec3 haze = mix(vec3(0.36, 0.35, 0.33), vec3(0.62, 0.60, 0.56), shaft);
  vec3 col = haze * fog + vec3(0.75, 0.73, 0.70) * halo;

  // Dither removes banding on wide gradients.
  float dither = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;

  gl_FragColor = vec4(col + dither, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function AtmosphereCanvas({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl', { alpha: true, antialias: false, depth: false }) as
        | WebGLRenderingContext
        | null) ?? null;

    // No WebGL → the CSS wash remains; nothing else to do.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');

    let raf = 0;
    let disposed = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    // Simulation clock that only advances while the tab is visible.
    let simTime = 0;
    let last = 0;

    const drawFrame = () => {
      resize();
      gl.uniform1f(uIntensity, intensity);
      gl.uniform1f(uTime, simTime);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const render = (now: number) => {
      if (disposed) return;
      if (last === 0) last = now;
      simTime += Math.min((now - last) / 1000, 0.05);
      last = now;
      drawFrame();
      raf = requestAnimationFrame(render);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const play = () => {
      if (raf || disposed || reduced) return;
      last = 0;
      raf = requestAnimationFrame(render);
    };

    if (reduced) {
      // Honour reduced motion: a single static frame.
      simTime = 12;
      drawFrame();
    } else {
      play();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else play();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [intensity, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="atmosphere-canvas"
      aria-hidden="true"
      role="presentation"
      style={{ opacity: reduced ? 0.5 : 0.85 }}
    />
  );
}
