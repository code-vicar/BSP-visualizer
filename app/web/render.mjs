function drawRect(stage, origin, size) {
    var graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFF00);

    // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(5, 0xFF0000);

    // draw a rectangle
    const {
        x,
        y
    } = origin

    const {
        width: w,
        height: h
    } = size
    graphics.drawRect(x, y, w, h)
    stage.addChild(graphics)
}

function renderLeafs(stage, graph) {
    graph.vertices.forEach(vertex => {
        if (graph.degrees.get(vertex['@@vertexId']) <= 1) {
            drawRect(stage, vertex.origin, vertex.size)
        }
    })
}

export function rendering(initWidth, initHeight) {
    // create an new instance of a pixi stage
    const stage = new PIXI.Stage(0x66FF99);

    // create a renderer instance.
    const renderer = PIXI.autoDetectRenderer(initWidth, initHeight);

    requestAnimationFrame(animate);

    function animate() {
        requestAnimationFrame(animate);

        // render the stage
        renderer.render(stage);
    }

    let width = initWidth
    let height = initHeight

    return {
        stage: stage,
        renderer: renderer,
        renderMap: function(renderWidth, renderHeight, opts) {
            if (width !== renderWidth || height !== renderHeight) {
                renderer.resize(renderWidth, renderHeight)
                width = renderWidth
                height = renderHeight
            }

            stage.removeChildren()
            const graph = bsp.generateMap(height, width, opts)
            renderLeafs(stage, graph)
        }
    };
};
