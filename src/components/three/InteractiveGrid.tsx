import { useRef, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const gridSize = 50;
const gridDivisions = 50;
const gravitationalStrength = 4;
const maxDistance = 10;
const returnSpeed = 0.08;
const explosionRadius = 25;

// Shockwave effect constants
const shockwaveSpeed = 0.3;
const shockwaveWidth = 3;
const shockwaveForce = 8;
const shockwaveDuration = 1000;
const explosionDelay = shockwaveDuration;
const forceVariation = 0.2;
const angleVariation = 0.15;

// Simple position-based noise for organic variation
function simpleNoise(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

// Global mouse position shared across components
const mousePosition = { x: 0, y: 0 };
const clickState = { isClicked: false, clickX: 0, clickY: 0, clickTime: 0 };

// Track mouse at document level
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('click', (e) => {
    clickState.isClicked = true;
    clickState.clickX = (e.clientX / window.innerWidth) * 2 - 1;
    clickState.clickY = -(e.clientY / window.innerHeight) * 2 + 1;
    clickState.clickTime = Date.now();

    setTimeout(() => {
      clickState.isClicked = false;
    }, shockwaveDuration);
  });
}

function GridMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, originalPositions, randomForce, randomAngleOffset] = useMemo(() => {
    const pos: number[] = [];
    const origPos: number[] = [];
    const force: number[] = [];
    const angleOff: number[] = [];
    const halfSize = gridSize / 2;
    const step = gridSize / gridDivisions;
    const particleCount = (gridDivisions + 1) * (gridDivisions + 1);

    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = -halfSize + i * step;
        const y = -halfSize + j * step;
        const z = 0;
        pos.push(x, y, z);
        origPos.push(x, y, z);

        // Per-particle random attributes for organic variation
        const particleIndex = i * (gridDivisions + 1) + j;
        const seed = particleIndex * 123.456;
        const rand1 = ((seed * 12.9898) % 1 + 1) % 1;
        const rand2 = ((seed * 78.233) % 1 + 1) % 1;

        // Force variation: 0.7 to 1.3
        force.push(1 - forceVariation + rand1 * forceVariation * 2);
        // Angle variation: -0.26 to +0.26 radians (±15 degrees)
        angleOff.push(-angleVariation + rand2 * angleVariation * 2);
      }
    }

    return [
      new Float32Array(pos),
      new Float32Array(origPos),
      new Float32Array(force),
      new Float32Array(angleOff)
    ];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const mouseX = (mousePosition.x * viewport.width) / 2;
    const mouseY = (mousePosition.y * viewport.height) / 2;
    const timeSinceClick = Date.now() - clickState.clickTime;
    const isExploding = clickState.isClicked && timeSinceClick < explosionDelay;

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const arr = positionAttribute.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];

      // Normal mouse interaction
      const dx = mouseX - ox;
      const dy = mouseY - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if particle is within explosion radius
      let inExplosionRadius = false;
      if (isExploding) {
        const clickWorldX = (clickState.clickX * viewport.width) / 2;
        const clickWorldY = (clickState.clickY * viewport.height) / 2;
        const clickDist = Math.sqrt((ox - clickWorldX) ** 2 + (oy - clickWorldY) ** 2);
        inExplosionRadius = clickDist < explosionRadius;
      }

      if (inExplosionRadius) {
        const clickWorldX = (clickState.clickX * viewport.width) / 2;
        const clickWorldY = (clickState.clickY * viewport.height) / 2;
        const clickDist = Math.sqrt((ox - clickWorldX) ** 2 + (oy - clickWorldY) ** 2);

        // Calculate expanding shockwave radius
        const waveRadius = (timeSinceClick / 1000) * shockwaveSpeed * 60;
        const distFromWave = Math.abs(clickDist - waveRadius);

        // Only affect particles near the shockwave ring
        if (distFromWave < shockwaveWidth) {
          const particleIndex = i / 3;
          const forceMult = randomForce[particleIndex];
          const angleNoise = randomAngleOffset[particleIndex] * 0.5;
          const waveIntensity = 1 - (distFromWave / shockwaveWidth);

          const angle = Math.atan2(oy - clickWorldY, ox - clickWorldX) + angleNoise;
          const pushStrength = shockwaveForce * waveIntensity * forceMult;

          // Push particles outward from the wave
          const targetX = ox + Math.cos(angle) * pushStrength;
          const targetY = oy + Math.sin(angle) * pushStrength;

          arr[i] += (targetX - arr[i]) * 0.3;
          arr[i + 1] += (targetY - arr[i + 1]) * 0.3;
          arr[i + 2] += (pushStrength * 0.4 - arr[i + 2]) * 0.15;
        }
      } else if (dist < maxDistance && dist > 0.1) {
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
  const { viewport } = useThree();

  const [positions, originalPositions, indices, randomForce, randomAngleOffset] = useMemo(() => {
    const pos: number[] = [];
    const origPos: number[] = [];
    const idx: number[] = [];
    const force: number[] = [];
    const angleOff: number[] = [];
    const halfSize = gridSize / 2;
    const step = gridSize / gridDivisions;

    let vertexIndex = 0;
    let pointIndex = 0;

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

        // Per-particle random attributes for organic variation
        const seed1 = pointIndex++ * 123.456;
        const rand1a = ((seed1 * 12.9898) % 1 + 1) % 1;
        const rand1b = ((seed1 * 78.233) % 1 + 1) % 1;
        force.push(1 - forceVariation + rand1a * forceVariation * 2);
        angleOff.push(-angleVariation + rand1b * angleVariation * 2);

        const seed2 = pointIndex++ * 123.456;
        const rand2a = ((seed2 * 12.9898) % 1 + 1) % 1;
        const rand2b = ((seed2 * 78.233) % 1 + 1) % 1;
        force.push(1 - forceVariation + rand2a * forceVariation * 2);
        angleOff.push(-angleVariation + rand2b * angleVariation * 2);
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

        // Per-particle random attributes for organic variation
        const seed1 = pointIndex++ * 123.456;
        const rand1a = ((seed1 * 12.9898) % 1 + 1) % 1;
        const rand1b = ((seed1 * 78.233) % 1 + 1) % 1;
        force.push(1 - forceVariation + rand1a * forceVariation * 2);
        angleOff.push(-angleVariation + rand1b * angleVariation * 2);

        const seed2 = pointIndex++ * 123.456;
        const rand2a = ((seed2 * 12.9898) % 1 + 1) % 1;
        const rand2b = ((seed2 * 78.233) % 1 + 1) % 1;
        force.push(1 - forceVariation + rand2a * forceVariation * 2);
        angleOff.push(-angleVariation + rand2b * angleVariation * 2);
      }
    }

    return [
      new Float32Array(pos),
      new Float32Array(origPos),
      new Uint32Array(idx),
      new Float32Array(force),
      new Float32Array(angleOff)
    ];
  }, []);

  useFrame(() => {
    if (!linesRef.current) return;

    const mouseX = (mousePosition.x * viewport.width) / 2;
    const mouseY = (mousePosition.y * viewport.height) / 2;
    const timeSinceClick = Date.now() - clickState.clickTime;
    const isExploding = clickState.isClicked && timeSinceClick < explosionDelay;

    const positionAttribute = linesRef.current.geometry.attributes.position;
    const arr = positionAttribute.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];

      // Normal mouse interaction
      const dx = mouseX - ox;
      const dy = mouseY - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if particle is within explosion radius
      let inExplosionRadius = false;
      if (isExploding) {
        const clickWorldX = (clickState.clickX * viewport.width) / 2;
        const clickWorldY = (clickState.clickY * viewport.height) / 2;
        const clickDist = Math.sqrt((ox - clickWorldX) ** 2 + (oy - clickWorldY) ** 2);
        inExplosionRadius = clickDist < explosionRadius;
      }

      if (inExplosionRadius) {
        const clickWorldX = (clickState.clickX * viewport.width) / 2;
        const clickWorldY = (clickState.clickY * viewport.height) / 2;
        const clickDist = Math.sqrt((ox - clickWorldX) ** 2 + (oy - clickWorldY) ** 2);

        // Calculate expanding shockwave radius
        const waveRadius = (timeSinceClick / 1000) * shockwaveSpeed * 60;
        const distFromWave = Math.abs(clickDist - waveRadius);

        // Only affect particles near the shockwave ring
        if (distFromWave < shockwaveWidth) {
          const particleIndex = i / 3;
          const forceMult = randomForce[particleIndex];
          const angleNoise = randomAngleOffset[particleIndex] * 0.5;
          const waveIntensity = 1 - (distFromWave / shockwaveWidth);

          const angle = Math.atan2(oy - clickWorldY, ox - clickWorldX) + angleNoise;
          const pushStrength = shockwaveForce * 0.7 * waveIntensity * forceMult;

          // Push particles outward from the wave
          const targetX = ox + Math.cos(angle) * pushStrength;
          const targetY = oy + Math.sin(angle) * pushStrength;

          arr[i] += (targetX - arr[i]) * 0.25;
          arr[i + 1] += (targetY - arr[i + 1]) * 0.25;
          arr[i + 2] += (pushStrength * 0.35 - arr[i + 2]) * 0.12;
        }
      } else if (dist < maxDistance && dist > 0.1) {
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
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        style={{ background: 'transparent', pointerEvents: 'auto' }}
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
