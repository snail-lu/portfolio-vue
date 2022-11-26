const setSize = ({ clientWidth, clientHeight }, camera, renderer) => {
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 渲染阴影
    render.shadowMap.enabled = true;
};

class Resizer {
    constructor(container, camera, renderer) {
        // set initial size
        setSize(container, camera, renderer);

        window.addEventListener('resize', () => {
            // set the size again if a resize occurs
            setSize(container, camera, renderer);
            // perform any custom actions
            this.onResize();
        });
    }

    onResize() { }
}

export { Resizer };
