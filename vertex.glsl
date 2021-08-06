// responsible for position of element
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}