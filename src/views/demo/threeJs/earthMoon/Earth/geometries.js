import { SphereGeometry } from 'three';

function createGeometries() {
    const EARTH_RADIUS = 2.5;
    const earthGeometry = new SphereGeometry(EARTH_RADIUS, 16, 16);

    return earthGeometry;
}

export { createGeometries };
