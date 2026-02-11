import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Grid, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// A procedural brutalist shape generator to ensure "Beast Mode" visuals 
// even without external assets.
const BrutalistStructure = ({ seed }: { seed: number }) => {
  const group = useRef<THREE.Group>(null);
  
  // Create random block configurations based on seed
  const blocks = useMemo(() => {
    const items = [];
    const count = 5 + (seed % 4); // 5 to 8 blocks
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random()) * 3,
          (Math.random() - 0.5) * 4
        ] as [number, number, number],
        scale: [
          0.5 + Math.random() * 2,
          0.5 + Math.random() * 4,
          0.5 + Math.random() * 2
        ] as [number, number, number]
      });
    }
    return items;
  }, [seed]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} scale={block.scale} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#404040" 
            roughness={0.2} 
            metalness={0.1}
          />
          {/* Wireframe overlay for technical look */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color="#666" opacity={0.3} transparent />
          </lineSegments>
        </mesh>
      ))}
      {/* Base Platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
         <boxGeometry args={[10, 0.5, 10]} />
         <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
};

interface ModelViewerProps {
  modelUrl?: string;
  autoRotate?: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, autoRotate = true }) => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 45 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 20]} />
        
        <Suspense fallback={<Loader />}>
           <Stage environment={null} intensity={0.5} contactShadow={{ opacity: 0.5, blur: 2 }}>
            <Center>
               {/* In a real app, useGLTF(modelUrl) would go here. 
                   For this demo, we use the procedural generator. */}
               <BrutalistStructure seed={modelUrl ? modelUrl.length : 1} />
            </Center>
           </Stage>
        </Suspense>

        <Grid 
          renderOrder={-1} 
          position={[0, -0.1, 0]} 
          infiniteGrid 
          cellSize={1} 
          sectionSize={3} 
          fadeDistance={30} 
          sectionColor="#333" 
          cellColor="#222" 
        />
        
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2} 
        />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={50} color="blue" />
      </Canvas>
      
      {/* Instructions Overlay */}
      <div className="absolute bottom-6 left-6 pointer-events-none select-none">
        <div className="flex flex-col gap-1 text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
           <span className="flex items-center gap-2"><span className="w-2 h-2 border border-neutral-600 rounded-full"></span> Left Click to Rotate</span>
           <span className="flex items-center gap-2"><span className="w-2 h-2 border border-neutral-600 rounded-full"></span> Scroll to Zoom</span>
           <span className="flex items-center gap-2"><span className="w-2 h-2 border border-neutral-600 rounded-full"></span> Right Click to Pan</span>
        </div>
      </div>
    </div>
  );
};

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
         <div className="w-12 h-12 border-2 border-t-white border-neutral-800 rounded-full animate-spin"></div>
         <span className="text-xs font-mono uppercase tracking-widest text-white">Loading Asset</span>
      </div>
    </Html>
  );
}