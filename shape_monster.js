// Shape Monster!
// --------------
// File:   shape_monster.js
// Author: Chris Linstid <chris@linstid.com>
//
// This is a silly game that I'm building for my (as of July 2013) 17 month old
// daughter. She isn't quite ready to play it yet, but maybe by the time I get
// enough free minutes, she'll be ready.
//
// The basic premise of the game is to guide colorful shapes to the shape
// monsters that feed on them. There really is no end to the game, it's just
// for fun.

// document has loaded, let's get those shape monsters up and running
$(document).ready(function() {
    var stage = new Kinetic.Stage({
        container: 'content',
        width: 700,
        height: 700
    });

    var rectMonster = new Kinetic.Rect({
        name: 'rectMonster',
        x: 100,
        y: 300,
        width: 100,
        height: 100,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });

    var circleMonster = new Kinetic.Rect({
        name: 'circleMonster',
        x: 300,
        y: 300,
        width: 100,
        height: 100,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });

    var triangleMonster = new Kinetic.Rect({
        name: 'triangleMonster',
        x: 500,
        y: 300,
        width: 100,
        height: 100,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });

    var rect = new Kinetic.Rect({
        name: 'rect',
        x: 100,
        y: 50,
        width: 50,
        height: 50,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });

    rect.on('dragmove', function(mouseEvent) {
        rect.moveToTop();
        if (rectMonster.intersects([mouseEvent.layerX,
                                   mouseEvent.layerY])) {
            var tween = new Kinetic.Tween({
                node: rect,
                duration: 0.5,
                width: 0,
                height: 0
            });
            tween.play();
        }
    });

    var circle = new Kinetic.Circle({
        name: 'circle',
        x: 200,
        y: 75,
        radius: 25,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });

    circle.on('dragmove', function(mouseEvent) {
        circle.moveToTop();
        if (circleMonster.intersects([mouseEvent.layerX,
                                     mouseEvent.layerY])) {
            var tween = new Kinetic.Tween({
                node: circle,
                duration: 0.5,
                radius: 0,
            });
            tween.play();
        }
    });

    var triangle = new Kinetic.RegularPolygon({
        name: 'triangle',
        x: 300,
        y: 75,
        radius: 27,
        sides: 3,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });

    triangle.on('dragmove', function(mouseEvent) {
        triangle.moveToTop();
        if (triangleMonster.intersects([mouseEvent.layerX,
                                       mouseEvent.layerY])) {
            var tween = new Kinetic.Tween({
                node: triangle,
                duration: 0.5,
                radius: 0,
            });
            tween.play();
        }
    });

    var monsterLayer = new Kinetic.Layer();
    monsterLayer.add(rectMonster);
    monsterLayer.add(circleMonster);
    monsterLayer.add(triangleMonster);
    stage.add(monsterLayer);

    var shapeLayer = new Kinetic.Layer();
    shapeLayer.add(rect);
    shapeLayer.add(circle);
    shapeLayer.add(triangle);
    stage.add(shapeLayer);
});

