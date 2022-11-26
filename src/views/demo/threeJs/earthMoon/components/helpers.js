import { AxesHelper, GridHelper } from 'three';

function createAxesHelper() {
    const helper = new AxesHelper(3);
    // helper.position.set(-3.5, 0, -3.5);
    helper.position.set(0, 0, 0);
    return helper;
}

function createGridHelper() {
    const helper = new GridHelper(6);
    return helper;
}

export { createAxesHelper, createGridHelper };
