(function() {
    'use strict';

    var app = angular.module('BSP-visualizer', ['Rendering']);

    app.controller('mainCtrl', ['renderer', function(renderer) {
        var mainCtrl = this;

        mainCtrl.scene = {};
        mainCtrl.scene.height = 400;
        mainCtrl.scene.width = 400;
        mainCtrl.MAX_LEAF_SIZE = 70;
        mainCtrl.MIN_LEAF_SIZE = 70;
        mainCtrl.SKIP_SPLIT_ABOVE_MAX = 0;
        mainCtrl.SKIP_SPLIT = 0;

        var oldView;

        mainCtrl.setView = function setView() {
            var view = renderer(mainCtrl.scene.width, mainCtrl.scene.height, {
                MAX_LEAF_SIZE: mainCtrl.MAX_LEAF_SIZE,
                MIN_LEAF_SIZE: mainCtrl.MIN_LEAF_SIZE,
                SKIP_SPLIT_ABOVE_MAX: mainCtrl.SKIP_SPLIT_ABOVE_MAX,
                SKIP_SPLIT: mainCtrl.SKIP_SPLIT
            });

            var stage = document.getElementById('stage');

            if (oldView) {
                stage.replaceChild(view, oldView);
            } else {
                stage.appendChild(view);
            }
            oldView = view;
        };

        mainCtrl.setView();
    }]);
}());
