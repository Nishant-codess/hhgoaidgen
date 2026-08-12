import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const EditorParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Floating Firefly Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      particleSpeeds[i] = 0.008 + Math.random() * 0.015;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d800,
      size: 0.16,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Soft Ambient Orbs floating in background
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const orb1Geo = new THREE.SphereGeometry(3.5, 32, 32);
    const orb1Mat = new THREE.MeshBasicMaterial({
      color: 0x0f8a4a,
      transparent: true,
      opacity: 0.12,
    });
    const orb1 = new THREE.Mesh(orb1Geo, orb1Mat);
    orb1.position.set(-8, 3, -5);
    orbGroup.add(orb1);

    const orb2Geo = new THREE.SphereGeometry(4.0, 32, 32);
    const orb2Mat = new THREE.MeshBasicMaterial({
      color: 0xff2d84,
      transparent: true,
      opacity: 0.08,
    });
    const orb2 = new THREE.Mesh(orb2Geo, orb2Mat);
    orb2.position.set(8, -4, -6);
    orbGroup.add(orb2);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Float particles upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 12) {
          positions[i * 3 + 1] = -12;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Gentle movement for ambient orbs
      orb1.position.x = -8 + Math.sin(elapsedTime * 0.5) * 1.5;
      orb1.position.y = 3 + Math.cos(elapsedTime * 0.6) * 1.0;

      orb2.position.x = 8 + Math.cos(elapsedTime * 0.4) * 1.5;
      orb2.position.y = -4 + Math.sin(elapsedTime * 0.5) * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      orb1Geo.dispose();
      orb1Mat.dispose();
      orb2Geo.dispose();
      orb2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};
