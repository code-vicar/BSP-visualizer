(function() {
    'use strict';

    var rendering = angular.module('Rendering', []);

    rendering.service('renderer', function() {

        return function(x, y, opts) {
            var mapTree = generateMap(x, y, opts);

            console.dir(mapTree);

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

            function drawRect(x, y, w, h) {
                var graphics = new PIXI.Graphics();

                graphics.beginFill(0xFFFF00);

                // set the line style to have a width of 5 and set the color to red
                graphics.lineStyle(5, 0xFF0000);

                // draw a rectangle
                graphics.drawRect(x, y, w, h);

                stage.addChild(graphics);
            }

            function renderLeaf(leaf) {
                if (!leaf.leftChild && !leaf.rightChild) {
                    drawRect(leaf.pos.x, leaf.pos.y, leaf.size.w, leaf.size.h);
                }

                if (leaf.leftChild) {
                    renderLeaf(leaf.leftChild);
                }
                if (leaf.rightChild) {
                    renderLeaf(leaf.rightChild);
                }
            }

            renderLeaf(mapTree);

            return renderer.view;
        };

    });

}());
