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

// get coordinates for the end result of a touch/click and drag
// returns an array: [x, y]
function getDragCoordinates(dragEvent) {
    var coordinates = [-1, -1];
    if (dragEvent instanceof TouchEvent) {
        coordinates[0] = dragEvent.targetNode.attrs.x;
        coordinates[1] = dragEvent.targetNode.attrs.y;
    }
    else if (dragEvent instanceof MouseEvent) {
        coordinates[0] = dragEvent.layerX;
        coordinates[1] = dragEvent.layerY;
    }
    else
    {
        return null;
    }

    return coordinates;
}

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
        y: 100,
        width: 100,
        height: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });

    var circle = new Kinetic.Circle({
        name: 'circle',
        x: 200,
        y: 100,
        radius: 50,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });

    var triangle = new Kinetic.RegularPolygon({
        name: 'triangle',
        x: 300,
        y: 100,
        radius: 52,
        sides: 3,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
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

    rect.on('dragmove', function(dragEvent) {
        rect.moveToTop();

        var coordinates = getDragCoordinates(dragEvent);
        if (!coordinates) {
            return;
        }
        var intersectionObject = monsterLayer.getIntersection(coordinates);
        if (intersectionObject && intersectionObject.shape === rectMonster) {
            var tween = new Kinetic.Tween({
                node: rect,
                duration: 0.5,
                width: 0,
                height: 0
            });
            rect.setDraggable(false);
            tween.play();
            window.setTimeout(500, function() {
                rect.remove();
            });
        }
    });

    circle.on('dragmove', function(dragEvent) {
        circle.moveToTop();

        var coordinates = getDragCoordinates(dragEvent);
        if (!coordinates) {
            return;
        }

        var intersectionObject = monsterLayer.getIntersection(coordinates);
        if (intersectionObject && intersectionObject.shape === circleMonster) {
            var tween = new Kinetic.Tween({
                node: circle,
                duration: 0.5,
                radius: 0,
            });
            circle.stopDrag();
            tween.play();
            window.setTimeout(500, function() {
                circle.remove();
            });
        }
    });

    triangle.on('dragmove', function(dragEvent) {
        triangle.moveToTop();

        var coordinates = getDragCoordinates(dragEvent);
        if (!coordinates) {
            return;
        }

        var intersectionObject = monsterLayer.getIntersection(coordinates);
        if (intersectionObject && intersectionObject.shape === triangleMonster) {
            var tween = new Kinetic.Tween({
                node: triangle,
                duration: 0.5,
                radius: 0,
            });
            triangle.stopDrag();
            tween.play();
            window.setTimeout(500, function() {
                triangle.remove();
            });
        }
    });

});

