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

// Triangle class
// --------------
// This builds an equilateral triangle centered at x, y where size represents
// the distance from the center to each vertex.
//
// x: center X coordinate
// y: center y coordinate
// size: distance from center to vertices
// fillColor: color to fill it with
function Triangle(x, y, size, fillColor) {
    this.radius = size;
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

// Circle class
// ------------
// This builds a circle centered at x, y with a radius of radius.
//
// x: center X coordinate
// y: center y coordinate
// radius: radius of the circle 
// fillColor: color to fill it with
function Circle(x, y, radius, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
    this.fillColor = fillColor || "blue";
}

Circle.prototype.draw = function(context) {
    context.fillStyle = this.fillColor;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    context.fill();
}

Circle.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    board.redraw();
}

// Square class
// ------------
// Builds a circle centered at x, y, with a side length of length.
//
// x: center X coordinate
// y: center Y coordinate
// length: length of a side
// fillColor: color to fill it with
function Square(x, y, length, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.length = length || 0;
    this.radius = length / 2;
    this.fillColor = fillColor || "green";
}

Square.prototype.draw = function(context) {
    context.fillStyle = this.fillColor;
    context.fillRect(this.x - this.length / 2, 
                     this.y - this.length / 2, 
                     this.length, this.length);
}

Square.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
    board.redraw();
}

// CImage class
// ------------
// Represents an image that we're drawing on the canvas.
//
// src: URL to the image
// shape: The shape that we want to point at.
function CImage(src, shape) {
    this.loaded = false;
    this.draw_requested = false;
    this.move(shape);
    this.image = new Image();
    this.image.onload = this.image_loaded;
    this.image.src = src;
}

CImage.prototype.image_loaded = function() {
    board.redraw();
}

CImage.prototype.draw = function(context) {
    if (this.x == 0 || this.y == 0) {
        console.log("No x or y! D'OH!");
        return;
    }
    if (this.width == 0 || this.height == 0) {
        context.drawImage(this.image, this.x, this.y);
    }
    else {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

CImage.prototype.move = function(shape) {
    this.x = shape.x;
    this.y = shape.y;
    this.width = shape.radius / 2;
    this.height = shape.radius*(3/4);
}

// board
// -----
// The board is the control object that keeps the state of the playing board
// and contains the functions used for progressing through the game.
var board = {
    shapes: [],
    images: [],
    shape_index: 0,
    move_speed: 4,
    start: function() {

        // register callbacks for key presses
        $(window).keydown(board.handle_keydown);

        // set variables for the canvas
        board.canvas = $("#main")[0];
        board.context = board.canvas.getContext('2d');

        // draw the initial shapes
        var triangle = new Triangle(80, 80, 70);
        board.shapes.push(triangle);

        var circle = new Circle(300, 60, 55);
        board.shapes.push(circle);

        var square = new Square(500, 60, 110);
        board.shapes.push(square);

        // draw the cursor image
        first_shape = board.shapes[board.shape_index];
        board.cursor_image = new CImage("3D_hand_cursor.png", 
                                        board.shapes[board.shape_index]);

        board.redraw();
    },

    clear: function() {
        board.context.clearRect(0, 0, board.canvas.width, board.canvas.height);
    },

    redraw: function() {
        board.clear();
        for (var i = 0; i < board.shapes.length; i++) {
            var shape = board.shapes[i];
            if (shape) {
                shape.draw(board.context);
            }
        }

        for (var i = 0; i < board.images.length; i++) {
            var image = board.images[i];
            if (image) {
                image.draw(board.context);
            }
        }

        board.cursor_image.draw(board.context);
    },

    next_shape: function() {
        board.shape_index += 1;
        if (board.shape_index >= board.shapes.length) {
            board.shape_index = 0;
        }
        board.cursor_image.move(board.shapes[board.shape_index]);
        board.redraw();
    },

    move_shape: function(x, y) {
        board.shapes[board.shape_index].move(x, y);
    },

    move_shape_left: function() {
        var shape = board.shapes[board.shape_index];
        board.move_shape(shape.x - board.move_speed, shape.y);
        board.cursor_image.move(shape);
    },

    move_shape_right: function() {
        var shape = board.shapes[board.shape_index];
        board.move_shape(shape.x + board.move_speed, shape.y);
        board.cursor_image.move(shape);
    },

    move_shape_down: function() {
        var shape = board.shapes[board.shape_index];
        board.move_shape(shape.x, shape.y + board.move_speed);
        board.cursor_image.move(shape);
    },

    move_shape_up: function() {
        var shape = board.shapes[board.shape_index];
        board.move_shape(shape.x, shape.y - board.move_speed);
        board.cursor_image.move(shape);
    },

    handle_keydown: function(event) {
        var key_map = {
            9: board.next_shape, // tab
            37: board.move_shape_left,
            38: board.move_shape_up,
            39: board.move_shape_right,
            40: board.move_shape_down,
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

function window_resize() {
    // TODO
}

// document has loaded, let's get those shape monsters up and running
$(document).ready(function() {
    $(window).resize(window_resize);
    window_resize();
    board.start();
});

