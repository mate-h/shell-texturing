import { useControls } from 'leva'
import frag from './shell.frag'
import vert from './shell.vert'
import { uniforms } from '../params'
import { useMemo, useRef, useState } from 'react'
import { ShaderMaterial, Uniform } from 'three'
import ComputeShader from '../compute'
import noise from './noise.frag'
import { useRenderTarget } from '../compute/target'

export function ShellTexture({
  size,
  count,
  i,
  noiseTexture,
}: {
  size: number
  count: number
  i: number
  noiseTexture?: WebGLTexture
}) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { height } = useControls({
    height: { value: 0.1, min: 0, max: 1, step: 0.01, label: 'Height' },
  })
  const [fs, setFs] = useState(frag)
  import.meta.hot?.accept('./shell.frag', (module) => {
    setFs(module!.default)
    if (mat.current) {
      mat.current!.needsUpdate = true
    }
  })
  const layer = useMemo(() => {
    return new Uniform(i / (count - 1))
  }, [i, count])
  return (
    <mesh
      position={[0, i * 0.1 * height, 0]} // i + .5
      scale={[size, size, size]} // size / count
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry />
      <shaderMaterial
        ref={mat}
        fragmentShader={fs}
        vertexShader={vert}
        uniforms={{ ...uniforms, layer, noiseTexture: { value: noiseTexture } }}
        side={2}
      />
    </mesh>
  )
}

export default function ShellTextures() {
  const { size, count } = useControls({
    size: { value: 10, min: 0, max: 100, step: 0.01, label: 'Size' },
    count: { value: 100, min: 1, max: 500, step: 1, label: 'Count' },
  })
  const renderTarget = useRenderTarget({
    width: 400,
    height: 400,
    options: {
      // minFilter: NearestFilter,
      // magFilter: NearestFilter,
    },
  })
  const [fs, setFs] = useState(noise)
  const mat = useRef<ShaderMaterial>(null)
  import.meta.hot?.accept('./noise.frag', (module) => {
    setFs(module!.default)
    if (mat.current) {
      mat.current!.needsUpdate = true
      // renderTarget.texture.needsUpdate = true
      console.log('update')
    }
  })
  return (
    <group>
      <ComputeShader
        ref={mat}
        renderTarget={renderTarget}
        fragmentShader={fs}
        uniforms={uniforms}
      />
      {Array.from({ length: count }, (_, i) => (
        <ShellTexture
          i={i}
          size={size}
          count={count}
          key={i}
          noiseTexture={renderTarget.texture}
        />
      ))}
    </group>
  )
}
