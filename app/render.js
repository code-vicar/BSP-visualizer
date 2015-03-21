(function() {
    'use strict';

    function drawRect(stage, x, y, w, h) {
        var graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFFF00);

        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(5, 0xFF0000);

        // draw a rectangle
        graphics.drawRect(x, y, w, h);

        stage.addChild(graphics);
    }

    function renderLeafs(stage, graph) {
        var i, v, len, vertexIds = graph.vertexIds();

        for (i = 0, len = vertexIds.length; i < len; i++) {
            if (graph.degrees[vertexIds[i]] <= 1) {
                v = graph.vertex(vertexIds[i]);
                drawRect(stage, v.pos.x, v.pos.y, v.size.w, v.size.h);
            }
        }
    }

    var rendering = angular.module('Rendering', []);

    rendering.service('renderer', function() {
        return function(x, y) {
            // create an new instance of a pixi stage
            var stage = new PIXI.Stage(0x66FF99);

            // create a renderer instance.
            var renderer = PIXI.autoDetectRenderer(x, y);

            requestAnimFrame(animate);

            function animate() {
                requestAnimFrame(animate);

                // render the stage   
                renderer.render(stage);
            }

            var outerX = x,
                outerY = y;

            return {
                stage: stage,
                renderer: renderer,
                renderMap: function(x, y, opts) {
                    if (outerX !== x || outerY !== y) {
                        renderer.resize(x, y);
                        outerX = x;
                        outerY = y;
                    }

                    stage.removeChildren();
                    var mapGraph = generateMap(x, y, opts);

                    renderLeafs(stage, mapGraph);
                }
            };
        };
    });
}());
