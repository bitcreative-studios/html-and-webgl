// declare our use of the same varying defined in vertex shader
varying vec2 vUv;

void main() {
    // color is RGBA; u,v,0,1
    gl_FragColor = vec4(vec3(vUv, 0.), 1.);
}