in vec2 vUv;
in vec3 vPosition;

uniform float value;
uniform float layer;
uniform sampler2D noiseTexture;

// https://iquilezles.org/articles/distfunctions/
float sdCone(vec3 p, vec2 q) {
  // c is the sin/cos of the angle, h is height
  // Alternatively pass q instead of (c,h),
  // which is the point at the base in 2D
  // vec2 q = h * vec2(c.x / c.y, -1.0);

  vec2 w = vec2(length(p.xz), p.y);
  vec2 a = w - q * clamp(dot(w, q) / dot(q, q), 0.0, 1.0);
  vec2 b = w - q * vec2(clamp(w.x / q.x, 0.0, 1.0), 1.0);
  float k = sign(q.y);
  float d = min(dot(a, a), dot(b, b));
  float s = max(k * (w.x * q.y - w.y * q.x), k * (w.y - q.y));
  return sqrt(d) * sign(s);
}

float sdSphere(vec3 p, float s) {
  return length(p) - s;
}

const float PI = 3.1415926535897932384626433832795;

void main2() {
  vec3 r = vec3(vUv.x, layer, vUv.y) * 2. - 1.;
  float q = sdSphere(r, 1.);
  q = sdCone(r - vec3(0., 1., 0.), vec2(1., -2.));
  if(q > 0.) {
    discard;
  }
  vec3 c = vec3(0.33, 0.49, 0.27) * mix(.3, 1., layer);
  gl_FragColor = vec4(c, 1.);
}

void main() {
  vec4 s = texture(noiseTexture, vUv);
  float t = ((1. + .25) - layer) * (s.b * s.a + .25);
  if(s.r > .5 * t) {
    discard;
  }
  // #567d46
  float da = mix(.3, 1., s.g);
  float db = mix(.3, 1., layer / (1. - s.r));
  vec3 c = vec3(0.33, 0.49, 0.27) * da * db;
  gl_FragColor = vec4(c, 1.);
}