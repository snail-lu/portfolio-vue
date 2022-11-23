import { SphereGeometry } from 'three';

function createGeometries() {
    const MOON_RADIUS = 0.82;
    const moonGeometry = new SphereGeometry(MOON_RADIUS, 16, 16);

    return {
        moonGeometry
    };
}

export { createGeometries };
