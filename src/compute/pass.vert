out vec2 vUv;
out vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}