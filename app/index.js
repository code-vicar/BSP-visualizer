(function() {
    'use strict';

    var app = angular.module('BSP-visualizer', ['Rendering']);

    app.controller('mainCtrl', ['renderer', function(renderer) {
        var mainCtrl = this;

        mainCtrl.scene = {};
        mainCtrl.scene.height = 400;
        mainCtrl.scene.width = 400;
        mainCtrl.MAX_LEAF_SIZE = 150;
        mainCtrl.MIN_LEAF_SIZE = 80;
        mainCtrl.SKIP_SPLIT_ABOVE_MAX = 2;
        mainCtrl.SKIP_SPLIT = 8;

        // initialize the renderer
        //   and append it's view to the DOM
        var ctx = renderer(mainCtrl.scene.width, mainCtrl.scene.height);
        var stageElement = document.getElementById('stage');
        stage.appendChild(ctx.renderer.view);

        mainCtrl.setView = function setView() {
            // draw the map
            ctx.renderMap(mainCtrl.scene.width, mainCtrl.scene.height, {
                MAX_LEAF_SIZE: mainCtrl.MAX_LEAF_SIZE,
                MIN_LEAF_SIZE: mainCtrl.MIN_LEAF_SIZE,
                SKIP_SPLIT_ABOVE_MAX: mainCtrl.SKIP_SPLIT_ABOVE_MAX,
                SKIP_SPLIT: mainCtrl.SKIP_SPLIT
            });
        };

        mainCtrl.setView();
    }]);
}());
