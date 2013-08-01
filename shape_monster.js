var k = {
    SPACE: 32,
    TAB: 9,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

var board = {
    shapes: [],
    shape_index: 0,
    start: function() {
        $(window).keydown(board.handle_keydown);
        board.canvas = $("#main")[0];
        board.context = board.canvas.getContext('2d');
        var triangle = new Triangle(80, 80, 70);
        triangle.draw(board.context);
        board.shapes.push(triangle);

        var circle = new Circle(300, 60, 50);
        circle.draw(board.context);
        board.shapes.push(circle);
    },

    clear: function() {
        board.context.clearRect(0, 0, board.canvas.width, board.canvas.height);
    },

    redraw: function() {
        board.clear();
        for (var i = 0; i < board.shapes.length; i++) {
            if (board.shapes[i]) {
                var shape = board.shapes[i];
                shape.draw(board.context);
            }
        }
    },

    next_shape: function() {
        board.shape_index += 1;
        if (board.shape_index >= board.shapes.length) {
            board.shape_index = 0;
        }
        console.log("Selected new shape %d %s", 
                    board.shape_index, 
                    board.shapes[board.shape_index]);
        board.redraw();
    },

    handle_keydown: function(event) {
        var key_map = {
            9: board.next_shape,
        };

        if (key_map[event.which]) {
            key_map[event.which]();
            
            // Override whatever else the browser might want to do with one of
            // our registered key presses.
            return false;
        }

        // We don't have anything registered for this key press, so just let it
        // continue up the stack.
        return true;
    },

};

// Circle class:
//
// This builds a circle centered at x, y with a radius of r.
//
// x: center X coordinate
// y: center y coordinate
// r: radius of the circle 
// fillColor: color to fill it with
function Circle(x, y, r, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 0;
    this.fillColor = fillColor || "blue";
}

Circle.prototype.draw = function(context) {
    context.fillStyle = this.fillColor;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
    context.fill();
}

Circle.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    board.redraw();
}


// Triangle class:
//
// This builds an equilateral triangle centered at x, y where size represents
// the distance from the center to each vertex.
//
// x: center X coordinate
// y: center y coordinate
// size: distance from center to vertices
// fillColor: color to fill it with
function Triangle(x, y, size, fillColor) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.update_coordinates();
    this.fillColor = fillColor || "red";
}

Triangle.prototype.update_coordinates = function() {
    this.x1 = this.x;
    this.y1 = this.y - this.size;
    this.x2 = this.x + this.size * Math.cos(Math.PI/8);
    this.y2 = this.y + this.size * Math.sin(Math.PI/8);
    this.x3 = this.x - this.size * Math.cos(Math.PI/8);
    this.y3 = this.y2;
}

Triangle.prototype.draw = function(context) {
    context.fillStyle = this.fillColor;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x3, this.y3);
    context.fill();
}

Triangle.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    this.update_coordinates();
    board.redraw();
}

// document has loaded, let's get those shape monsters up and running
function window_resize() {
    // TODO
}

$(document).ready(function() {
    $(window).resize(window_resize);
    window_resize();
    board.start();
});

