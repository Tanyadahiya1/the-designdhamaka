import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// The hero object is a 3D version of the "dhamaka" (burst) from the logo:
// a glossy core with radiating rays and floating confetti, which visibly
// pulses outward when the visitor clicks anywhere on the hero.
const RAY_COUNT = 28
const RAY_COLORS = ['#E8792B', '#F2B705', '#F2A65A']

function Burst() {
  const groupRef = useRef<THREE.Group>(null)
  const raysRef = useRef<THREE.Mesh[]>([])
  const target = useRef({ x: 0, y: 0 })
  const burst = useRef(0) // 0 = resting, 1 = just clicked
  const { viewport } = useThree()

  const rays = useMemo(() => {
    return Array.from({ length: RAY_COUNT }).map((_, i) => {
      const angle = (i / RAY_COUNT) * Math.PI * 2
      const long = i % 3 === 0
      return {
        angle,
        length: long ? 1.55 : 1.05 + Math.random() * 0.25,
        thickness: long ? 0.09 : 0.055,
        color: RAY_COLORS[i % RAY_COLORS.length],
      }
    })
  }, [])

  useEffect(() => {
    function onMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    function onClick() {
      burst.current = 1
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    groupRef.current.rotation.z += 0.05 * delta
    groupRef.current.rotation.y += (target.current.x * 0.3 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (target.current.y * 0.2 - groupRef.current.rotation.x) * 0.04
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12

    burst.current += (0 - burst.current) * 0.06

    raysRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const wobble = 1 + Math.sin(t * 1.4 + i) * 0.03
      const pulse = 1 + burst.current * 0.9
      mesh.scale.set(1, wobble * pulse, 1)
    })
  })

  const scale = Math.min(viewport.width / 6, 1.35)

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        {/* glossy core */}
        <mesh>
          <sphereGeometry args={[0.55, 48, 48]} />
          <meshPhysicalMaterial
            color="#F2B705"
            metalness={0.4}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* radiating rays */}
        {rays.map((r, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) raysRef.current[i] = el
            }}
            position={[Math.cos(r.angle) * r.length * 0.55, Math.sin(r.angle) * r.length * 0.55, 0]}
            rotation={[0, 0, r.angle - Math.PI / 2]}
          >
            <coneGeometry args={[r.thickness, r.length, 6]} />
            <meshPhysicalMaterial color={r.color} metalness={0.3} roughness={0.25} clearcoat={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Confetti({ count = 140 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const colors = ['#E8792B', '#F2B705', '#6FB1A0', '#C77DFF', '#F26D6D']

  const { positions, colorArray } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
      const c = new THREE.Color(colors[i % colors.length])
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colorArray: col }
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#FFF3D6" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#E8792B" />
      <pointLight position={[3, 3, 4]} intensity={0.5} color="#F2B705" />
    </>
  )
}

export default function Scene3D() {
  const [count, setCount] = useState(80)

  useEffect(() => {
  const updateParticleCount = () => {
    setCount(window.innerWidth < 768 ? 35 : 140)
  }

  updateParticleCount()
  window.addEventListener('resize', updateParticleCount)

  return () => {
    window.removeEventListener('resize', updateParticleCount)
  }
}, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Burst />
        <Confetti count={count} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  )
}
