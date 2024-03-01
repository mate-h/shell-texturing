import { ScreenQuad } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { IUniform, Scene, ShaderMaterial, WebGLRenderTarget } from 'three'
import vert from './pass.vert'

type Props = {
  renderTarget: WebGLRenderTarget
  fragmentShader: string
  uniforms?: Record<string, IUniform>
}
const ComputeShader = forwardRef<ShaderMaterial, Props>((props, ref) => {
  const { renderTarget, fragmentShader, uniforms } = props

  const root = useRef<Scene>(null)
  useFrame(({ gl, camera }) => {
    const scene = root.current!
    if (!scene || !renderTarget) return
    scene.visible = true
    gl.setRenderTarget(renderTarget)
    gl.render(scene, camera)
    scene.visible = false
    gl.setRenderTarget(null)
  })
  return (
    <scene ref={root}>
      <ScreenQuad>
        <shaderMaterial
          ref={ref}
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={fragmentShader}
          depthTest={false}
        />
      </ScreenQuad>
    </scene>
  )
})

export default ComputeShader
