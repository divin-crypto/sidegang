import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Extrude, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Hand-built F shapes as Shape objects — same paths as SVG
function createFShape() {
  const shape = new THREE.Shape();
  // M10,25 H140 V62 H54 V90 H124 V122 H54 V175 H10 Z — scaled to ~1 unit tall
  shape.moveTo(0, 1.5);
  shape.lineTo(1.3, 1.5);
  shape.lineTo(1.3, 1.13);
  shape.lineTo(0.44, 1.13);
  shape.lineTo(0.44, 0.85);
  shape.lineTo(1.14, 0.85);
  shape.lineTo(1.14, 0.53);
  shape.lineTo(0.44, 0.53);
  shape.lineTo(0.44, 0);
  shape.lineTo(0, 0);
  shape.closePath();
  return shape;
}

function createChevronShape() {
  const s = new THREE.Shape();
  // M150,58 L182,100 L150,142 L172,142 L204,100 L172,58 Z
  s.moveTo(1.4, 0.92);
  s.lineTo(1.72, 0.5);
  s.lineTo(1.4, 0.08);
  s.lineTo(1.62, 0.08);
  s.lineTo(1.94, 0.5);
  s.lineTo(1.62, 0.92);
  s.closePath();
  return s;
}

function Sculpture({ quiet = false }: { quiet?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(() => [createFShape(), createFShape(), createChevronShape()], []);

  useFrame((state) => {
    if (quiet || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.14) * 0.06;
    group.current.rotation.x = Math.sin(t * 0.11) * 0.03;
  });

  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 8,
    }),
    [],
  );

  return (
    <group ref={group} position={[0, 0.05, 0]} rotation={[0.04, 0, 0]}>
      {/* Left F */}
      <Extrude args={[shapes[0], extrudeSettings]} position={[-1.78, -0.75, -0.11]}>
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.72}
          roughness={0.28}
          envMapIntensity={0.9}
        />
      </Extrude>
      {/* Chevron */}
      <Extrude args={[shapes[2], extrudeSettings]} position={[-0.14, -0.75, -0.11]}>
        <meshStandardMaterial color="#0A0A0A" metalness={0.68} roughness={0.32} />
      </Extrude>
      {/* Right F — mirrored */}
      <Extrude args={[shapes[1], extrudeSettings]} position={[0.28, -0.75, -0.11]}>
        <meshStandardMaterial color="#0A0A0A" metalness={0.72} roughness={0.28} />
      </Extrude>
    </group>
  );
}

export default function HeroSceneCanvas({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className="hero-scene3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0.35, 3.6], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Studio lighting: soft key + rim + fill */}
        <directionalLight position={[-2.2, 3.2, 2.8]} intensity={1.35} color="#fff8ed" castShadow />
        <directionalLight position={[2.4, 1.2, 2.2]} intensity={0.65} color="#e8e6e3" />
        <directionalLight position={[0, -1.2, 1.5]} intensity={0.22} color="#7E7E80" />
        <spotLight position={[0, 3.5, 1.2]} angle={0.55} penumbra={0.7} intensity={1.1} color="#ffffff" />
        <ambientLight intensity={0.45} color="#1a1a18" />

        <Sculpture quiet={quiet} />

        <ContactShadows position={[0, -0.82, 0]} opacity={0.55} scale={7} blur={2.2} far={2} color="#000000" />
        <Environment preset="studio" environmentIntensity={0.55} />

        {/* Subtle fog */}
        <fog attach="fog" args={['#0A0A0A', 3.8, 8]} />
      </Canvas>
    </div>
  );
}
