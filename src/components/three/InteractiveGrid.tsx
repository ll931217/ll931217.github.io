import { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const gridSize = 50;
const gridDivisions = 50;
const gravitationalStrength = 4;
const maxDistance = 10;
const returnSpeed = 0.08;

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

      if (dist < maxDistance && dist > 0.1) {
        // Gravitational pull - attract towards cursor
        const force = (1 - dist / maxDistance) * gravitationalStrength;
        const angle = Math.atan2(dy, dx);
        
        // Target position pulled towards cursor
        const targetX = ox + Math.cos(angle) * force;
        const targetY = oy + Math.sin(angle) * force;
        
        // Smooth interpolation towards target
        arr[i] += (targetX - arr[i]) * 0.15;
        arr[i + 1] += (targetY - arr[i + 1]) * 0.15;
        // Slight Z displacement for depth effect
        arr[i + 2] += (force * 0.3 - arr[i + 2]) * 0.1;
      } else {
        // Return to original position smoothly
        arr[i] += (ox - arr[i]) * returnSpeed;
        arr[i + 1] += (oy - arr[i + 1]) * returnSpeed;
        arr[i + 2] *= 0.92;
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
        color="#ff3333"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.7}
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
    
    // Vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = -halfSize + i * step;
      for (let j = 0; j < gridDivisions; j++) {
        const y1 = -halfSize + j * step;
        const y2 = -halfSize + (j + 1) * step;
        pos.push(x, y1, 0);
        pos.push(x, y2, 0);
        origPos.push(x, y1, 0);
        origPos.push(x, y2, 0);
        idx.push(vertexIndex, vertexIndex + 1);
        vertexIndex += 2;
      }
    }

    // Horizontal lines
    for (let j = 0; j <= gridDivisions; j++) {
      const y = -halfSize + j * step;
      for (let i = 0; i < gridDivisions; i++) {
        const x1 = -halfSize + i * step;
        const x2 = -halfSize + (i + 1) * step;
        pos.push(x1, y, 0);
        pos.push(x2, y, 0);
        origPos.push(x1, y, 0);
        origPos.push(x2, y, 0);
        idx.push(vertexIndex, vertexIndex + 1);
        vertexIndex += 2;
      }
    }

    return [new Float32Array(pos), new Float32Array(origPos), new Uint32Array(idx)];
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

      if (dist < maxDistance && dist > 0.1) {
        // Gravitational pull - attract towards cursor
        const force = (1 - dist / maxDistance) * (gravitationalStrength * 0.7);
        const angle = Math.atan2(dy, dx);
        
        // Target position pulled towards cursor
        const targetX = ox + Math.cos(angle) * force;
        const targetY = oy + Math.sin(angle) * force;
        
        // Smooth interpolation towards target
        arr[i] += (targetX - arr[i]) * 0.12;
        arr[i + 1] += (targetY - arr[i + 1]) * 0.12;
        arr[i + 2] += (force * 0.2 - arr[i + 2]) * 0.08;
      } else {
        // Return to original position smoothly
        arr[i] += (ox - arr[i]) * returnSpeed;
        arr[i + 1] += (oy - arr[i + 1]) * returnSpeed;
        arr[i + 2] *= 0.94;
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
      <lineBasicMaterial color="#222222" transparent opacity={0.5} />
    </lineSegments>
  );
}

/**
 * CSS-based fallback grid for devices without WebGL/GPU support
 * This is a static grid that doesn't have the interactive effect but
 * provides a similar visual appearance
 */
function CSSGridFallback() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: `
          linear-gradient(to right, rgba(34, 34, 34, 0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34, 34, 34, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Radial gradient overlay for depth effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.8) 70%)',
        }}
      />
      {/* Subtle accent glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 51, 51, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}

/**
 * Three.js WebGL Grid component
 */
function WebGLGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true,
        }}
        fallback={<CSSGridFallback />}
      >
        <GridLines />
        <GridMesh />
      </Canvas>
    </div>
  );
}

/**
 * Interactive Grid component with automatic GPU/WebGL detection
 * Falls back to a CSS-based static grid if WebGL is not available or
 * the device doesn't have proper GPU acceleration
 */
export default function InteractiveGrid() {
  const { supported, isHardwareAccelerated, isLoading, isLowEnd, isMobile } = useWebGLSupport();

  // Show nothing while detecting (very brief)
  if (isLoading) {
    return null;
  }

  // Use CSS fallback if:
  // - WebGL is not supported
  // - No hardware acceleration (software rendering)
  // - Low-end mobile device (to save battery and prevent lag)
  const shouldUseFallback = !supported || !isHardwareAccelerated || (isMobile && isLowEnd);

  if (shouldUseFallback) {
    return <CSSGridFallback />;
  }

  return <WebGLGrid />;
}
