import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Scene from './scene'
import { Perf } from 'r3f-perf'
import { UniformParams, useParams } from './params'

function App() {
  const { debug } = useParams()
  return (
    <Canvas camera={{ position: [0, 10, -10] }}>
      {debug && <Perf position="top-left" minimal />}
      {debug && <gridHelper />}
      {debug && <gridHelper position={[0,5,5]} rotation={[-Math.PI/2, 0,0]} />}
      <UniformParams />
      <Scene />
      <OrbitControls />
    </Canvas>
  )
}

export default App
