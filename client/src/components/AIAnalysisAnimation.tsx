import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 5000 }) {
  const mesh = useRef()
  const light = useRef()

  const dummy = new THREE.Object3D()

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = Math.random() * 2 - 1
      const y = Math.random() * 2 - 1
      const z = Math.random() * 2 - 1
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle

      // Update the particle time
      const t = (particle.time += speed)

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t)
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  )
}

export default function AIAnalysisAnimation() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <OrbitControls />
      </Canvas>
      <div className="absolute text-center">
        <h2 className="text-4xl font-bold mb-4">Analyzing Your Responses</h2>
        <p className="text-xl">Our AI is processing your answers to provide personalized career insights...</p>
      </div>
    </div>
  )
}

