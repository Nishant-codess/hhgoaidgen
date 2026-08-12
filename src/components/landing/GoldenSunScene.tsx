import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const GoldenSunScene: React.FC = () => {
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
    camera.position.set(0, 0, 18);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf5d800, 2.5, 50);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // 4. Central Glowing 3D Golden Sun Mesh
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunGeo = new THREE.IcosahedronGeometry(3.8, 4);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xf5d800,
      emissive: 0xd4bc00,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: false,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Wireframe Outer Layer for stylized hackathon vibe
    const wireGeo = new THREE.IcosahedronGeometry(4.1, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff2d84,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sunGroup.add(wireMesh);

    // 5. Sun Ray Halo Rings
    const ringGeo = new THREE.RingGeometry(4.8, 6.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf5d800,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    sunGroup.add(ringMesh);

    // 6. Floating Firefly Particles (Builders shipping in Goa)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      particleSpeeds[i] = 0.01 + Math.random() * 0.02;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d800,
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Sun rotation
      sunMesh.rotation.y = elapsedTime * 0.2;
      sunMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      wireMesh.rotation.y = -elapsedTime * 0.3;
      wireMesh.rotation.z = elapsedTime * 0.15;
      ringMesh.rotation.z = elapsedTime * 0.1;

      // Particle floating upward animation
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = -15;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Gentle floating motion for overall group
      sunGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sunGeo.dispose();
      sunMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
};
