import { Mesh } from 'three';

import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';

function Moon() {
    const moonGeometry = createGeometries();
    const moonMaterials = createMaterials();

    const moon = new Mesh(moonGeometry, moonMaterials);

    return moon
}

export { Moon };
