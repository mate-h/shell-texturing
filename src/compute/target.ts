import { useMemo } from 'react'
import { HalfFloatType, RenderTargetOptions, WebGLRenderTarget } from 'three'

type Props = {
  width: number
  height: number
  options?: RenderTargetOptions
}

export function useRenderTarget(props: Props) {
  const { width, height, options } = props
  const renderTarget = useMemo(() => {
    return new WebGLRenderTarget(width, height, {
      type: HalfFloatType,
      ...options
    })
  }, [width, height])
  return renderTarget
}
