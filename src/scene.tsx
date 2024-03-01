import { useFrame } from '@react-three/fiber'
import { Uniform } from 'three'
import ShellTextures from './shell/shell'
import { Environment } from '@react-three/drei'
import { useControls } from 'leva'

export function useTime() {
  const time = new Uniform(0)
  useFrame((state) => {
    time.value = state.clock.getElapsedTime()
  })
  return time
}

export default () => {
  const { background, visible } = useControls({
    background: { value: false, label: 'Background' },
    visible: { value: false, label: 'Sphere' },
  })
  return (
    <>
      <Environment background={background} preset="dawn" />
      <mesh visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial />
      </mesh>
      <ShellTextures />
    </>
  )
}
