// declare our use of the same varying defined in vertex shader
varying vec2 vUv;
varying float noise;

void main() {
    // compose the color using the uv coordinate
    // and modulate it with noise like ambient occusion
    vec3 color = vec3(vUv * (1. -2. * noise), 0.0);
    gl_FragColor = vec4(color.rgb, 1.0);
}