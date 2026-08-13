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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf5d800, 3, 60);
    pointLight.position.set(0, 2, 6);
    scene.add(pointLight);

    // 4. Central Group
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    // 4a. Smooth High-Poly Glowing Sun Core (128x128 SphereGeometry - no visible triangles!)
    const sunGeo = new THREE.SphereGeometry(3.8, 128, 128);
    const sunMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          // Fresnel rim lighting for smooth realistic sphere glow
          float viewDot = max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          float rim = pow(1.0 - viewDot, 2.2);
          
          vec3 goldenCenter = vec3(0.98, 0.88, 0.15); // Vibrant sun yellow
          vec3 warmOrangeRim = vec3(1.0, 0.42, 0.1);  // Sunset glow
          vec3 deepPinkCorona = vec3(0.95, 0.18, 0.5); // Subtle pink blend
          
          vec3 baseColor = mix(goldenCenter, warmOrangeRim, rim * 0.8);
          baseColor = mix(baseColor, deepPinkCorona, pow(rim, 3.0) * 0.4);
          
          // Subtle solar plasma pulse effect
          float pulse = 0.03 * sin(uTime * 1.8 + vUv.y * 12.0);
          baseColor += vec3(pulse);

          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // 4b. Solar Corona Outer Glow Sphere (Atmospheric Fresnel Rim)
    const coronaGeo = new THREE.SphereGeometry(5.2, 64, 64);
    const coronaMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float uTime;
        void main() {
          float viewDot = max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          float coronaIntensity = pow(1.0 - viewDot, 3.0);
          
          vec3 coronaColor = vec3(0.96, 0.82, 0.1);
          float alpha = coronaIntensity * (0.45 + 0.05 * sin(uTime * 2.5));
          gl_FragColor = vec4(coronaColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // 5. Floating Firefly Particles (Builders shipping in Goa)
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

      // Update Shader Uniforms
      sunMat.uniforms.uTime.value = elapsedTime;
      coronaMat.uniforms.uTime.value = elapsedTime;

      // Gentle Rotations
      sunMesh.rotation.y = elapsedTime * 0.15;

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
      coronaGeo.dispose();
      coronaMat.dispose();
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
