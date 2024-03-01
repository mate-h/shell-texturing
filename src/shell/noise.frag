in vec3 vPosition;

uniform float value;

#include ./fbm

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);
	float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vPosition.xy / 2. + .5;
  float r = noise(uv * 400.);
  float g = noise(uv * 400. + 1000.);
  float b = noise(uv * 24. + 4000.);
  float a = noise(uv * 4. + 4000.);
  // float h2 = noise((uv + vec2(100.)) * 200.);
  // h += h2 * .5;
  gl_FragColor = vec4(r, g, b, a);
}