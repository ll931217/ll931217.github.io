import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const gridSize = 40;
const gridDivisions = 40;

function GridMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const pos: number[] = [];
    const origPos: number[] = [];
    const halfSize = gridSize / 2;
    const step = gridSize / gridDivisions;

    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = -halfSize + i * step;
        const y = -halfSize + j * step;
        const z = 0;
        pos.push(x, y, z);
        origPos.push(x, y, z);
      }
    }

    return [new Float32Array(pos), new Float32Array(origPos)];
  }, []);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    mouseRef.current.x = (mouse.x * viewport.width) / 2;
    mouseRef.current.y = (mouse.y * viewport.height) / 2;

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const arr = positionAttribute.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];

      const dx = mouseRef.current.x - ox;
      const dy = mouseRef.current.y - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 8;
      const strength = 3;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * strength;
        arr[i + 2] = -force;
      } else {
        arr[i + 2] *= 0.9;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#333333"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function GridLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, originalPositions, indices] = useMemo(() => {
    const pos: number[] = [];
    const origPos: number[] = [];
    const idx: number[] = [];
    const halfSize = gridSize / 2;
    const step = gridSize / gridDivisions;

    let vertexIndex = 0;
    
    for (let i = 0; i <= gridDivisions; i++) {
      const x = -halfSize + i * step;
      pos.push(x, -halfSize, 0);
      pos.push(x, halfSize, 0);
      origPos.push(x, -halfSize, 0);
      origPos.push(x, halfSize, 0);
      idx.push(vertexIndex, vertexIndex + 1);
      vertexIndex += 2;
    }

    for (let j = 0; j <= gridDivisions; j++) {
      const y = -halfSize + j * step;
      pos.push(-halfSize, y, 0);
      pos.push(halfSize, y, 0);
      origPos.push(-halfSize, y, 0);
      origPos.push(halfSize, y, 0);
      idx.push(vertexIndex, vertexIndex + 1);
      vertexIndex += 2;
    }

    return [new Float32Array(pos), new Float32Array(origPos), new Uint16Array(idx)];
  }, []);

  useFrame(({ mouse }) => {
    if (!linesRef.current) return;

    mouseRef.current.x = (mouse.x * viewport.width) / 2;
    mouseRef.current.y = (mouse.y * viewport.height) / 2;

    const positionAttribute = linesRef.current.geometry.attributes.position;
    const arr = positionAttribute.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];

      const dx = mouseRef.current.x - ox;
      const dy = mouseRef.current.y - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 6;
      const strength = 2;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * strength;
        arr[i + 2] = -force;
      } else {
        arr[i + 2] *= 0.92;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={indices}
          itemSize={1}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#222222" transparent opacity={0.4} />
    </lineSegments>
  );
}

export default function InteractiveGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <GridLines />
        <GridMesh />
      </Canvas>
    </div>
  );
}
